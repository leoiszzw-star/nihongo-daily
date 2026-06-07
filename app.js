// === Japanese Daily - Main App Logic (v2 Optimized) ===

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
        this.audioCtx = null;

        this.init();
    }

    // === Audio Feedback ===
    getAudioCtx() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioCtx;
    }

    playSound(type) {
        try {
            const ctx = this.getAudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'correct') {
                osc.frequency.setValueAtTime(523, ctx.currentTime); // C5
                osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
                osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.4);
            } else if (type === 'wrong') {
                osc.frequency.setValueAtTime(200, ctx.currentTime);
                osc.frequency.setValueAtTime(180, ctx.currentTime + 0.15);
                osc.type = 'sawtooth';
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === 'tap') {
                osc.frequency.setValueAtTime(800, ctx.currentTime);
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.05);
            } else if (type === 'achievement') {
                osc.frequency.setValueAtTime(523, ctx.currentTime);
                osc.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
                osc.frequency.setValueAtTime(784, ctx.currentTime + 0.3);
                osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.45);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.7);
            }
        } catch (e) { /* audio not supported */ }
    }

    vibrate(ms = 10) {
        if (navigator.vibrate) navigator.vibrate(ms);
    }

    // === Confetti ===
    showConfetti() {
        const container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);

        const colors = ['#6c63ff', '#4ecdc4', '#ffd93d', '#ff6b6b', '#8b83ff'];
        for (let i = 0; i < 40; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (1.5 + Math.random()) + 's';
            container.appendChild(confetti);
        }

        setTimeout(() => container.remove(), 3000);
    }

    // === Achievement ===
    checkAchievements() {
        if (!this.state.achievements) this.state.achievements = [];

        for (const ach of ACHIEVEMENTS) {
            if (this.state.achievements.includes(ach.id)) continue;
            if (ach.condition(this.state)) {
                this.state.achievements.push(ach.id);
                this.saveState();
                this.showAchievementToast(ach);
            }
        }
    }

    showAchievementToast(ach) {
        this.playSound('achievement');
        this.vibrate(50);

        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <span class="toast-icon">${ach.icon}</span>
            <div class="toast-text">
                <div class="toast-title">🏅 成就解锁！</div>
                <div>${ach.name} — ${ach.desc}</div>
            </div>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('show'));
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // === State ===
    loadState() {
        const saved = localStorage.getItem('nihongo_state');
        if (saved) {
            const s = JSON.parse(saved);
            // Migrate old state
            if (!s.studyDates) s.studyDates = [];
            if (!s.achievements) s.achievements = [];
            if (!s.perfectQuiz) s.perfectQuiz = false;
            if (!s.nightStudy) s.nightStudy = false;
            return s;
        }
        return {
            streak: 0,
            lastStudyDate: null,
            wordsLearned: [],
            kanaMastered: [],
            totalDays: 0,
            reviewCards: [],
            dailyTasks: { kana: false, vocab: false, quiz: false },
            dailyDate: null,
            studyDates: [],
            achievements: [],
            perfectQuiz: false,
            nightStudy: false,
        };
    }

    saveState() {
        localStorage.setItem('nihongo_state', JSON.stringify(this.state));
    }

    init() {
        setTimeout(() => this.navigate('home'), 1400);
        this.checkStreak();
        this.updateHome();

        // Navigation
        document.querySelectorAll('.module-card').forEach(card => {
            card.addEventListener('click', () => {
                this.vibrate(5);
                this.navigate(card.dataset.page);
            });
        });
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.vibrate(5);
                this.navigate(btn.dataset.page);
            });
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

        // Avatar -> achievements
        document.getElementById('avatar-btn')?.addEventListener('click', () => this.navigate('achievements'));

        this.renderKanaGrid();

        // Night study check
        const hour = new Date().getHours();
        if (hour >= 23 || hour < 4) {
            this.state.nightStudy = true;
            this.saveState();
        }
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
            // Record study date
            const dateStr = new Date().toISOString().split('T')[0];
            if (!this.state.studyDates.includes(dateStr)) {
                this.state.studyDates.push(dateStr);
            }
        }
        this.saveState();
        this.updateHome();
        this.checkAchievements();
    }

    navigate(page) {
        const current = document.querySelector('.screen.active');
        if (current) current.classList.remove('active');
        const target = document.getElementById(page);
        if (target) {
            target.classList.add('active');
            this.currentScreen = page;
        }

        if (page === 'home') this.updateHome();
        if (page === 'kana') this.renderKanaGrid();
        if (page === 'vocab') this.renderVocab();
        if (page === 'quiz') this.startQuiz();
        if (page === 'review') this.initReview();
        if (page === 'achievements') this.renderAchievements();
    }

    updateHome() {
        // Greeting
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

        // Module card status
        document.querySelectorAll('.module-card').forEach(card => {
            const page = card.dataset.page;
            if (tasks[page]) {
                card.classList.add('completed');
            } else {
                card.classList.remove('completed');
            }
        });

        // Stats
        document.getElementById('stat-words').textContent = this.state.wordsLearned.length;
        document.getElementById('stat-kana').textContent = this.state.kanaMastered.length;
        document.getElementById('stat-days').textContent = this.state.totalDays;

        // Calendar heatmap
        this.renderCalendar();
    }

    renderCalendar() {
        const grid = document.getElementById('calendar-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 27); // Last 28 days

        for (let i = 0; i < 28; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            const dateStr = d.toISOString().split('T')[0];
            const cell = document.createElement('div');
            cell.className = 'calendar-day';

            if (this.state.studyDates.includes(dateStr)) {
                cell.classList.add('level-2');
            }
            if (d.toDateString() === today.toDateString()) {
                cell.classList.add('today');
                if (this.state.studyDates.includes(dateStr)) {
                    cell.classList.add('level-3');
                }
            }

            grid.appendChild(cell);
        }
    }

    // === KANA ===

    switchKanaType(type) {
        this.kanaType = type;
        document.querySelectorAll('.kana-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
        this.renderKanaGrid();
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

        data.forEach((k) => {
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
            cell.addEventListener('click', () => {
                this.playSound('tap');
                this.selectKana(k, cell);
            });
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
        document.getElementById('kana-quiz-char').style.animation = 'none';
        requestAnimationFrame(() => {
            document.getElementById('kana-quiz-char').style.animation = 'popIn 0.3s ease';
        });
        document.getElementById('kana-score').textContent = `${this.kanaQuizCorrect}/${this.kanaQuizIndex}`;
        document.getElementById('kana-quiz-progress').style.width =
            `${(this.kanaQuizIndex / this.kanaQuizQuestions.length) * 100}%`;
        document.getElementById('kana-feedback').textContent = '';

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
            this.playSound('correct');
            this.vibrate(5);
            document.getElementById('kana-feedback').textContent = '✓ 正确！';
            document.getElementById('kana-feedback').style.color = 'var(--success)';

            const q = this.kanaQuizQuestions[this.kanaQuizIndex];
            if (!this.state.kanaMastered.includes(q.char)) {
                this.state.kanaMastered.push(q.char);
                this.saveState();
            }
        } else {
            btn.classList.add('wrong');
            this.playSound('wrong');
            this.vibrate(30);
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

        if (this.kanaQuizCorrect === this.kanaQuizQuestions.length) {
            this.showConfetti();
        }

        document.getElementById('kana-quiz-char').textContent = '🎉';
        document.getElementById('kana-quiz-options').innerHTML = `
            <div style="text-align:center; padding:20px;">
                <p style="font-size:24px; margin-bottom:8px; font-weight:600;">测验完成！</p>
                <p style="font-size:20px; color:var(--accent-light);">${this.kanaQuizCorrect} / ${this.kanaQuizQuestions.length}</p>
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

        // Category badge
        const catEl = document.getElementById('vocab-category');
        if (catEl && v.category) {
            catEl.textContent = v.category;
            catEl.style.display = 'inline-block';
        }

        // Animate card
        const card = document.getElementById('vocab-card');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
            card.style.animation = 'fadeInUp 0.3s ease';
        });
    }

    vocabNav(dir) {
        this.vibrate(5);
        this.vocabIndex = (this.vocabIndex + dir + VOCABULARY.length) % VOCABULARY.length;
        this.renderVocab();
    }

    markVocabKnown() {
        this.playSound('correct');
        this.vibrate(5);
        const v = VOCABULARY[this.vocabIndex];
        if (!this.state.wordsLearned.includes(v.word)) {
            this.state.wordsLearned.push(v.word);
            this.markDailyTask('vocab');
            this.saveState();
        }
        this.vocabNav(1);
    }

    addToReview() {
        this.playSound('tap');
        this.vibrate(5);
        const v = VOCABULARY[this.vocabIndex];
        const exists = this.state.reviewCards.find(c => c.word === v.word);
        if (!exists) {
            this.state.reviewCards.push({
                word: v.word,
                reading: v.reading,
                meaning: v.meaning,
                exampleJp: v.exampleJp,
                nextReview: Date.now(),
                interval: 1,
                ease: 2.5,
            });
            if (!this.state.wordsLearned.includes(v.word)) {
                this.state.wordsLearned.push(v.word);
            }
            this.markDailyTask('vocab');
            this.saveState();
        }
        const btn = document.getElementById('vocab-learn');
        btn.textContent = '✓ 已加入';
        btn.style.borderColor = 'var(--success)';
        btn.style.color = 'var(--success)';
        setTimeout(() => {
            btn.textContent = '📝 加入复习';
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 1200);
    }

    // === QUIZ ===

    startQuiz() {
        document.getElementById('quiz-result').style.display = 'none';
        document.querySelector('#quiz .quiz-card').style.display = 'block';
        document.querySelector('#quiz .quiz-progress-bar').style.display = 'block';

        const pool = VOCABULARY.slice(0, Math.max(8, this.state.wordsLearned.length + 5));
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
        document.getElementById('quiz-question').style.animation = 'none';
        requestAnimationFrame(() => {
            document.getElementById('quiz-question').style.animation = 'popIn 0.3s ease';
        });
        document.getElementById('quiz-score').textContent = `${this.quizCorrect}/${this.quizIndex}`;
        document.getElementById('quiz-progress').style.width =
            `${(this.quizIndex / this.quizQuestions.length) * 100}%`;

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
            this.playSound('correct');
            this.vibrate(5);
        } else {
            btn.classList.add('wrong');
            this.playSound('wrong');
            this.vibrate(30);
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
            this.state.perfectQuiz = true;
            this.saveState();
            this.showConfetti();
            this.checkAchievements();
        } else if (this.quizCorrect >= 3) {
            document.getElementById('result-icon').textContent = '👏';
            document.getElementById('result-text').textContent = '不错！继续努力';
        } else {
            document.getElementById('result-icon').textContent = '💪';
            document.getElementById('result-text').textContent = '再练练就好了';
        }
    }

    // === REVIEW ===

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
                '<span style="font-size:32px;">🎊</span><br><br>今日复习完成！';
            this.showConfetti();
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
        this.playSound('tap');
        document.getElementById('review-front').style.display = 'none';
        document.getElementById('review-back').style.display = 'block';
    }

    reviewAction(action) {
        this.vibrate(5);
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

    // === ACHIEVEMENTS PAGE ===

    renderAchievements() {
        const container = document.getElementById('achievements-list');
        if (!container) return;
        container.innerHTML = '';

        for (const ach of ACHIEVEMENTS) {
            const unlocked = this.state.achievements.includes(ach.id);
            const el = document.createElement('div');
            el.className = 'achievement-item' + (unlocked ? ' unlocked' : '');
            el.innerHTML = `
                <span class="ach-icon">${unlocked ? ach.icon : '🔒'}</span>
                <div class="ach-info">
                    <div class="ach-name">${ach.name}</div>
                    <div class="ach-desc">${ach.desc}</div>
                </div>
            `;
            container.appendChild(el);
        }
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
