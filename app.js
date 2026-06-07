// === Japanese Daily - Main App Logic ===

class NihongoApp {
    constructor() {
        this.state = this.loadState();
        this.currentScreen = 'splash';
        this.kanaType = 'katakana';
        this.vocabIndex = 0;
        this.quizQuestions = [];
        this.quizIndex = 0;
        this.quizCorrect = 0;
        this.kanaQuizQuestions = [];
        this.kanaQuizIndex = 0;
        this.kanaQuizCorrect = 0;
        this.reviewQueue = [];
        this.reviewIndex = 0;

        this.init();
    }

    loadState() {
        const saved = localStorage.getItem('nihongo_state');
        if (saved) return JSON.parse(saved);
        return {
            streak: 0,
            lastStudyDate: null,
            wordsLearned: [],
            kanaMastered: [],
            totalDays: 0,
            reviewCards: [], // { word, nextReview, interval, ease }
            dailyTasks: { kana: false, vocab: false, quiz: false },
            dailyDate: null,
        };
    }

    saveState() {
        localStorage.setItem('nihongo_state', JSON.stringify(this.state));
    }

    init() {
        // Show splash then home
        setTimeout(() => this.navigate('home'), 1200);

        // Check streak
        this.checkStreak();
        this.updateHome();

        // Bind navigation
        document.querySelectorAll('.module-card').forEach(card => {
            card.addEventListener('click', () => this.navigate(card.dataset.page));
        });
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => this.navigate(btn.dataset.page));
        });
        document.querySelectorAll('[data-page]').forEach(el => {
            if (!el.classList.contains('module-card') && !el.classList.contains('back-btn')) {
                el.addEventListener('click', () => this.navigate(el.dataset.page));
            }
        });

        // Kana
        document.querySelectorAll('.kana-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchKanaType(tab.dataset.type));
        });
        document.querySelector('.kana-display').addEventListener('click', () => this.toggleKanaReveal());
        document.getElementById('kana-quiz-btn').addEventListener('click', () => this.startKanaQuiz());

        // Vocab
        document.getElementById('vocab-prev').addEventListener('click', () => this.vocabNav(-1));
        document.getElementById('vocab-next').addEventListener('click', () => this.vocabNav(1));
        document.getElementById('vocab-known').addEventListener('click', () => this.markVocabKnown());
        document.getElementById('vocab-learn').addEventListener('click', () => this.addToReview());

        // Quiz
        document.getElementById('quiz-retry').addEventListener('click', () => this.startQuiz());

        // Review
        document.getElementById('review-card')?.addEventListener('click', (e) => {
            if (!e.target.closest('.review-buttons')) this.flipReviewCard();
        });
        document.getElementById('review-again')?.addEventListener('click', () => this.reviewAction('again'));
        document.getElementById('review-good')?.addEventListener('click', () => this.reviewAction('good'));
        document.getElementById('review-easy')?.addEventListener('click', () => this.reviewAction('easy'));

        this.renderKanaGrid();
    }

    checkStreak() {
        const today = new Date().toDateString();
        if (this.state.dailyDate !== today) {
            this.state.dailyTasks = { kana: false, vocab: false, quiz: false };
            this.state.dailyDate = today;
        }

        if (this.state.lastStudyDate) {
            const last = new Date(this.state.lastStudyDate);
            const now = new Date();
            const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
            if (diffDays > 1) {
                this.state.streak = 0;
            }
        }
        this.saveState();
    }

    markDailyTask(task) {
        this.state.dailyTasks[task] = true;
        const today = new Date().toDateString();
        if (this.state.lastStudyDate !== today) {
            this.state.lastStudyDate = today;
            this.state.streak++;
            this.state.totalDays++;
        }
        this.saveState();
        this.updateHome();
    }

    navigate(page) {
        const current = document.querySelector('.screen.active');
        if (current) current.classList.remove('active');
        const target = document.getElementById(page);
        if (target) {
            target.classList.add('active');
            this.currentScreen = page;
        }

        // Init page content
        if (page === 'home') this.updateHome();
        if (page === 'kana') this.renderKanaGrid();
        if (page === 'vocab') this.renderVocab();
        if (page === 'quiz') this.startQuiz();
        if (page === 'review') this.initReview();
    }

    updateHome() {
        // Greeting based on time
        const hour = new Date().getHours();
        let greet = 'こんにちは';
        if (hour < 6) greet = 'おやすみ';
        else if (hour < 12) greet = 'おはよう';
        else if (hour >= 18) greet = 'こんばんは';
        document.getElementById('greeting-text').textContent = `${greet}、Daddy`;

        // Streak
        document.getElementById('streak-text').textContent = `🔥 连续学习 ${this.state.streak} 天`;

        // Daily progress
        const tasks = this.state.dailyTasks;
        const done = [tasks.kana, tasks.vocab, tasks.quiz].filter(Boolean).length;
        document.getElementById('progress-num').textContent = done;
        const circle = document.getElementById('daily-progress');
        const circumference = 326.73;
        circle.style.strokeDashoffset = circumference - (done / 3) * circumference;

        // Stats
        document.getElementById('stat-words').textContent = this.state.wordsLearned.length;
        document.getElementById('stat-kana').textContent = this.state.kanaMastered.length;
        document.getElementById('stat-days').textContent = this.state.totalDays;
    }

    // === KANA ===

    switchKanaType(type) {
        this.kanaType = type;
        document.querySelectorAll('.kana-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
        this.renderKanaGrid();
        // Reset display
        const data = type === 'katakana' ? KATAKANA : HIRAGANA;
        const first = data.find(k => k.char.trim());
        if (first) {
            document.getElementById('kana-char').textContent = first.char;
            document.getElementById('kana-romaji').textContent = first.romaji;
        }
        document.querySelector('.kana-display').classList.remove('revealed');
    }

    renderKanaGrid() {
        const grid = document.getElementById('kana-grid');
        const data = this.kanaType === 'katakana' ? KATAKANA : HIRAGANA;
        grid.innerHTML = '';

        data.forEach((k, i) => {
            const cell = document.createElement('div');
            cell.className = 'kana-cell';
            if (!k.char.trim()) {
                cell.style.visibility = 'hidden';
                grid.appendChild(cell);
                return;
            }

            const isMastered = this.state.kanaMastered.includes(k.char);
            if (isMastered) cell.classList.add('mastered');

            cell.innerHTML = `
                <span class="kana-cell-char">${k.char}</span>
                <span class="kana-cell-romaji">${k.romaji}</span>
            `;
            cell.addEventListener('click', () => this.selectKana(k, cell));
            grid.appendChild(cell);
        });
    }

    selectKana(kana, cell) {
        document.querySelectorAll('.kana-cell').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');
        document.getElementById('kana-char').textContent = kana.char;
        document.getElementById('kana-romaji').textContent = kana.romaji;
        document.querySelector('.kana-display').classList.add('revealed');
    }

    toggleKanaReveal() {
        const display = document.querySelector('.kana-display');
        display.classList.toggle('revealed');
    }

    startKanaQuiz() {
        const data = this.kanaType === 'katakana' ? KATAKANA : HIRAGANA;
        const valid = data.filter(k => k.char.trim());
        this.kanaQuizQuestions = this.shuffle(valid).slice(0, 10);
        this.kanaQuizIndex = 0;
        this.kanaQuizCorrect = 0;
        this.navigate('kana-quiz');
        this.renderKanaQuizQuestion();
    }

    renderKanaQuizQuestion() {
        if (this.kanaQuizIndex >= this.kanaQuizQuestions.length) {
            this.endKanaQuiz();
            return;
        }

        const q = this.kanaQuizQuestions[this.kanaQuizIndex];
        document.getElementById('kana-quiz-char').textContent = q.char;
        document.getElementById('kana-score').textContent = `${this.kanaQuizCorrect}/${this.kanaQuizIndex}`;
        document.getElementById('kana-quiz-progress').style.width =
            `${(this.kanaQuizIndex / this.kanaQuizQuestions.length) * 100}%`;
        document.getElementById('kana-feedback').textContent = '';

        // Generate options
        const data = this.kanaType === 'katakana' ? KATAKANA : HIRAGANA;
        const valid = data.filter(k => k.char.trim() && k.romaji !== q.romaji);
        const wrong = this.shuffle(valid).slice(0, 3).map(k => k.romaji);
        const options = this.shuffle([q.romaji, ...wrong]);

        const container = document.getElementById('kana-quiz-options');
        container.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => this.answerKanaQuiz(opt, q.romaji, btn));
            container.appendChild(btn);
        });
    }

    answerKanaQuiz(selected, correct, btn) {
        const options = document.querySelectorAll('#kana-quiz-options .quiz-option');
        options.forEach(o => o.style.pointerEvents = 'none');

        if (selected === correct) {
            btn.classList.add('correct');
            this.kanaQuizCorrect++;
            document.getElementById('kana-feedback').textContent = '✓ 正确！';
            document.getElementById('kana-feedback').style.color = 'var(--success)';

            // Mark mastered
            const q = this.kanaQuizQuestions[this.kanaQuizIndex];
            if (!this.state.kanaMastered.includes(q.char)) {
                this.state.kanaMastered.push(q.char);
                this.saveState();
            }
        } else {
            btn.classList.add('wrong');
            options.forEach(o => { if (o.textContent === correct) o.classList.add('correct'); });
            document.getElementById('kana-feedback').textContent = `✗ 正确答案是 ${correct}`;
            document.getElementById('kana-feedback').style.color = 'var(--error)';
        }

        setTimeout(() => {
            this.kanaQuizIndex++;
            this.renderKanaQuizQuestion();
        }, 1200);
    }

    endKanaQuiz() {
        this.markDailyTask('kana');
        // Show result in the quiz area
        document.getElementById('kana-quiz-char').textContent = '🎉';
        document.getElementById('kana-quiz-options').innerHTML = `
            <div style="text-align:center; padding:20px;">
                <p style="font-size:24px; margin-bottom:8px;">测验完成！</p>
                <p style="font-size:18px; color:var(--accent-light);">${this.kanaQuizCorrect} / ${this.kanaQuizQuestions.length}</p>
                <p style="margin-top:16px; color:var(--text-secondary);">
                    ${this.kanaQuizCorrect >= 8 ? '太棒了！🌟' : this.kanaQuizCorrect >= 5 ? '不错，继续加油！💪' : '多练习几次就好了～'}
                </p>
            </div>
        `;
        document.getElementById('kana-score').textContent = `${this.kanaQuizCorrect}/${this.kanaQuizQuestions.length}`;
        document.getElementById('kana-quiz-progress').style.width = '100%';
    }

    // === VOCAB ===

    renderVocab() {
        const v = VOCABULARY[this.vocabIndex];
        document.getElementById('vocab-word').textContent = v.word;
        document.getElementById('vocab-reading').textContent = v.reading;
        document.getElementById('vocab-meaning').textContent = v.meaning;
        document.getElementById('vocab-example-jp').textContent = v.exampleJp;
        document.getElementById('vocab-example-cn').textContent = v.exampleCn;
        document.getElementById('vocab-counter').textContent = `${this.vocabIndex + 1} / ${VOCABULARY.length}`;
    }

    vocabNav(dir) {
        this.vocabIndex = (this.vocabIndex + dir + VOCABULARY.length) % VOCABULARY.length;
        this.renderVocab();
    }

    markVocabKnown() {
        const v = VOCABULARY[this.vocabIndex];
        if (!this.state.wordsLearned.includes(v.word)) {
            this.state.wordsLearned.push(v.word);
            this.markDailyTask('vocab');
            this.saveState();
        }
        this.vocabNav(1);
    }

    addToReview() {
        const v = VOCABULARY[this.vocabIndex];
        const exists = this.state.reviewCards.find(c => c.word === v.word);
        if (!exists) {
            this.state.reviewCards.push({
                word: v.word,
                reading: v.reading,
                meaning: v.meaning,
                exampleJp: v.exampleJp,
                nextReview: Date.now(),
                interval: 1, // days
                ease: 2.5,
            });
            if (!this.state.wordsLearned.includes(v.word)) {
                this.state.wordsLearned.push(v.word);
            }
            this.markDailyTask('vocab');
            this.saveState();
        }
        // Visual feedback
        const btn = document.getElementById('vocab-learn');
        btn.textContent = '✓ 已加入';
        setTimeout(() => { btn.textContent = '📝 加入复习'; }, 1000);
    }

    // === QUIZ ===

    startQuiz() {
        document.getElementById('quiz-result').style.display = 'none';
        document.querySelector('#quiz .quiz-card').style.display = 'block';
        document.querySelector('#quiz .quiz-progress-bar').style.display = 'block';

        const pool = VOCABULARY.slice(0, Math.max(5, this.state.wordsLearned.length + 3));
        this.quizQuestions = this.shuffle(pool).slice(0, 5);
        this.quizIndex = 0;
        this.quizCorrect = 0;
        this.renderQuizQuestion();
    }

    renderQuizQuestion() {
        if (this.quizIndex >= this.quizQuestions.length) {
            this.endQuiz();
            return;
        }

        const q = this.quizQuestions[this.quizIndex];
        document.getElementById('quiz-question').textContent = q.word;
        document.getElementById('quiz-score').textContent = `${this.quizCorrect}/${this.quizIndex}`;
        document.getElementById('quiz-progress').style.width =
            `${(this.quizIndex / this.quizQuestions.length) * 100}%`;

        // Options
        const wrong = VOCABULARY.filter(v => v.word !== q.word);
        const wrongOpts = this.shuffle(wrong).slice(0, 3).map(v => v.meaning);
        const options = this.shuffle([q.meaning, ...wrongOpts]);

        const container = document.getElementById('quiz-options');
        container.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => this.answerQuiz(opt, q.meaning, btn));
            container.appendChild(btn);
        });
    }

    answerQuiz(selected, correct, btn) {
        const options = document.querySelectorAll('#quiz-options .quiz-option');
        options.forEach(o => o.style.pointerEvents = 'none');

        if (selected === correct) {
            btn.classList.add('correct');
            this.quizCorrect++;
        } else {
            btn.classList.add('wrong');
            options.forEach(o => { if (o.textContent === correct) o.classList.add('correct'); });
        }

        setTimeout(() => {
            this.quizIndex++;
            this.renderQuizQuestion();
        }, 1000);
    }

    endQuiz() {
        this.markDailyTask('quiz');
        document.querySelector('#quiz .quiz-card').style.display = 'none';
        document.querySelector('#quiz .quiz-progress-bar').style.display = 'none';

        const result = document.getElementById('quiz-result');
        result.style.display = 'block';
        document.getElementById('result-score').textContent = `${this.quizCorrect} / ${this.quizQuestions.length}`;

        if (this.quizCorrect === this.quizQuestions.length) {
            document.getElementById('result-icon').textContent = '🎉';
            document.getElementById('result-text').textContent = '全对！太厉害了！';
        } else if (this.quizCorrect >= 3) {
            document.getElementById('result-icon').textContent = '👏';
            document.getElementById('result-text').textContent = '不错！继续努力';
        } else {
            document.getElementById('result-icon').textContent = '💪';
            document.getElementById('result-text').textContent = '再练练就好了';
        }
    }

    // === REVIEW (Spaced Repetition) ===

    initReview() {
        const now = Date.now();
        this.reviewQueue = this.state.reviewCards.filter(c => c.nextReview <= now);

        if (this.reviewQueue.length === 0) {
            document.getElementById('review-empty').style.display = 'block';
            document.getElementById('review-card').style.display = 'none';
            document.getElementById('review-progress').style.display = 'none';
        } else {
            document.getElementById('review-empty').style.display = 'none';
            document.getElementById('review-card').style.display = 'flex';
            document.getElementById('review-progress').style.display = 'block';
            this.reviewIndex = 0;
            this.showReviewCard();
        }
    }

    showReviewCard() {
        if (this.reviewIndex >= this.reviewQueue.length) {
            document.getElementById('review-card').style.display = 'none';
            document.getElementById('review-progress').innerHTML =
                '<span style="font-size:24px;">🎊</span><br>今日复习完成！';
            return;
        }

        const card = this.reviewQueue[this.reviewIndex];
        document.getElementById('review-word').textContent = card.word;
        document.getElementById('review-meaning').textContent = card.meaning;
        document.getElementById('review-example').textContent = card.exampleJp;
        document.getElementById('review-front').style.display = 'block';
        document.getElementById('review-back').style.display = 'none';
        document.getElementById('review-remaining').textContent =
            `剩余 ${this.reviewQueue.length - this.reviewIndex} 张卡片`;
    }

    flipReviewCard() {
        document.getElementById('review-front').style.display = 'none';
        document.getElementById('review-back').style.display = 'block';
    }

    reviewAction(action) {
        const card = this.reviewQueue[this.reviewIndex];
        const stateCard = this.state.reviewCards.find(c => c.word === card.word);

        if (stateCard) {
            if (action === 'again') {
                stateCard.interval = 1;
                stateCard.ease = Math.max(1.3, stateCard.ease - 0.2);
            } else if (action === 'good') {
                stateCard.interval = Math.ceil(stateCard.interval * stateCard.ease);
                stateCard.ease += 0.05;
            } else if (action === 'easy') {
                stateCard.interval = Math.ceil(stateCard.interval * stateCard.ease * 1.5);
                stateCard.ease += 0.15;
            }
            stateCard.nextReview = Date.now() + stateCard.interval * 24 * 60 * 60 * 1000;
        }

        this.saveState();
        this.reviewIndex++;
        this.showReviewCard();
    }

    // === UTILS ===

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NihongoApp();
});
