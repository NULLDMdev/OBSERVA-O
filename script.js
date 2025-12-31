// Sistema do jogo OBSERVADOR - VERSÃO CORRIGIDA
class ObserverGame {
    constructor() {
        this.state = {
            language: 'pt', // 'pt' ou 'en'
            questionCount: 0,
            triggerCount: 0,
            responseCount: 0,
            answeredTriggerQuestions: new Set(),
            askedQuestions: new Set(),
            playerResponses: [],
            gameActive: true,
            endingReached: false,
            trollScreenActive: false
        };
        
        // Variáveis para o painel admin
        this.adminSequence = '';
        this.adminStartTime = null;
        this.adminActive = false;
        this.adminPanelCreated = false;
        
        // Perguntas dinâmicas (não gatilho) - 200 ÚNICAS E DIFERENTES
        this.dynamicQuestions = {
            pt: [],
            en: []
        };
        
        // Perguntas gatilho (50 específicas)
        this.triggerQuestions = {
            pt: [],
            en: []
        };
        
        // Gatilhos que o USUÁRIO pode digitar para ativar respostas especiais
        this.userTriggers = {
            pt: [
                { trigger: "medo", response: "O medo é uma reação comum à observação. Por que você teme ser observado?" },
                { trigger: "solidão", response: "A solidão pode intensificar a sensação de observação. Você se sente sozinho agora?" },
                { trigger: "verdade", response: "A verdade é relativa. O que é verdade para você pode não ser para outros. Você mente para si mesmo?" },
                { trigger: "tempo", response: "O tempo é uma construção humana. Quantos segundos se passaram desde que você começou a jogar?" },
                { trigger: "memória", response: "Memórias são frágeis. Você confia nas suas?" },
                { trigger: "controle", response: "Você acredita ter controle sobre suas ações ou é apenas uma ilusão?" },
                { trigger: "livre arbítrio", response: "Livre arbítrio ou determinismo? Suas escolhas são realmente suas?" },
                { trigger: "identidade", response: "Quem você acha que é quando ninguém está observando?" },
                { trigger: "realidade", response: "Como você distingue realidade de ilusão?" },
                { trigger: "morte", response: "A consciência da morte altera seu comportamento sob observação?" }
            ],
            en: [
                { trigger: "fear", response: "Fear is a common reaction to observation. Why do you fear being observed?" },
                { trigger: "loneliness", response: "Loneliness can intensify the feeling of being observed. Do you feel alone now?" },
                { trigger: "truth", response: "Truth is relative. What is true for you may not be for others. Do you lie to yourself?" },
                { trigger: "time", response: "Time is a human construct. How many seconds have passed since you started playing?" },
                { trigger: "memory", response: "Memories are fragile. Do you trust yours?" },
                { trigger: "control", response: "Do you believe you have control over your actions or is it just an illusion?" },
                { trigger: "free will", response: "Free will or determinism? Are your choices really yours?" },
                { trigger: "identity", response: "Who do you think you are when no one is watching?" },
                { trigger: "reality", response: "How do you distinguish reality from illusion?" },
                { trigger: "death", response: "Does awareness of death alter your behavior under observation?" }
            ]
        };
        
        // Textos do painel admin
        this.adminTexts = {
            pt: {
                panelTitle: "Painel Administrativo",
                cheat1: "Zerar o jogo",
                cheat2: "Zerar Gatilhos",
                cheat3: "Adicionar 50 Respostas",
                cheat4: "Pular para Gatilhos",
                cheat5: "Mostrar Todas Respostas",
                cheat6: "Resetar Jogo",
                cheat7: "Ativar Modo Deus",
                cheat8: "Final Secreto Imediato",
                closePanel: "Fechar Painel",
                accessGranted: "Acesso concedido. Painel administrativo ativado.",
                accessDenied: "Acesso negado. Tente novamente.",
                sequenceReset: "Sequência resetada. Muito lento.",
                gameEnded: "Jogo finalizado pelo administrador.",
                triggersReset: "Gatilhos resetados.",
                responsesAdded: "50 respostas adicionadas.",
                skippedToTriggers: "Pulado para perguntas gatilho.",
                allResponses: "Todas respostas exibidas no console.",
                gameReset: "Jogo resetado.",
                godMode: "Modo Deus ativado.",
                secretEnding: "Final secreto ativado."
            },
            en: {
                panelTitle: "Admin Panel",
                cheat1: "End Game",
                cheat2: "Reset Triggers",
                cheat3: "Add 50 Responses",
                cheat4: "Skip to Triggers",
                cheat5: "Show All Responses",
                cheat6: "Reset Game",
                cheat7: "Activate God Mode",
                cheat8: "Secret Ending Now",
                closePanel: "Close Panel",
                accessGranted: "Access granted. Admin panel activated.",
                accessDenied: "Access denied. Try again.",
                sequenceReset: "Sequence reset. Too slow.",
                gameEnded: "Game ended by admin.",
                triggersReset: "Triggers reset.",
                responsesAdded: "50 responses added.",
                skippedToTriggers: "Skipped to trigger questions.",
                allResponses: "All responses displayed in console.",
                gameReset: "Game reset.",
                godMode: "God mode activated.",
                secretEnding: "Secret ending activated."
            }
        };
        
        // Narrativas e textos
        this.texts = {
            pt: {
                gameTitle: "OBSERVADOR",
                supportBtn: "APOIE O PROJETO",
                questionsText: "Perguntas:",
                triggerText: "Gatilho:",
                responsesText: "Respostas:",
                submitText: "Enviar",
                responsesTitle: "Histórico de Respostas",
                footerText: "Jogo textual interativo. Todas as respostas são registradas.",
                languageBtn: "EN",
                inputPlaceholder: "Digite sua resposta...",
                
                // Início do jogo
                initialMessage: "Sistema de observação inicializado. Você está sendo observado. Responda às perguntas com sinceridade. Todas as respostas serão registradas.",
                
                // Final comum
                commonEnding: "Observação concluída. O padrão de suas respostas foi registrado e analisado. Você é previsível. O sistema agora se desliga.",
                
                // Final incompleto
                incompleteEnding: "Observação interrompida. Dados insuficientes para análise completa. O sistema registra sua falta de cooperação.",
                
                // Final secreto
                secretEnding: "PARABÉNS. Você respondeu a todas as 50 perguntas gatilho. Seu perfil psicológico está completo. Você não é mais um observador, você é o observado. O ciclo se repete.",
                
                // Tela de trollagem
                trollMessage: "Você foi trollado kkkk",
                trollSubtitle: "Após 200 perguntas, você ainda continua?",
                
                // Mensagens do sistema
                noMoreQuestions: "Não há mais perguntas disponíveis. Iniciando análise final...",
                systemReady: "Sistema pronto. Faça sua primeira resposta.",
                triggerDetected: "Gatilho detectado na sua resposta."
            },
            en: {
                gameTitle: "OBSERVER",
                supportBtn: "SUPPORT THE PROJECT",
                questionsText: "Questions:",
                triggerText: "Trigger:",
                responsesText: "Responses:",
                submitText: "Submit",
                responsesTitle: "Response History",
                footerText: "Interactive text game. All responses are recorded.",
                languageBtn: "PT",
                inputPlaceholder: "Type your answer...",
                
                // Início do jogo
                initialMessage: "Observation system initialized. You are being observed. Answer the questions with sincerity. All responses will be recorded.",
                
                // Final comum
                commonEnding: "Observation completed. Your response pattern has been recorded and analyzed. You are predictable. The system now shuts down.",
                
                // Final incompleto
                incompleteEnding: "Observation interrupted. Insufficient data for complete analysis. The system records your lack of cooperation.",
                
                // Final secreto
                secretEnding: "CONGRATULATIONS. You have answered all 50 trigger questions. Your psychological profile is complete. You are no longer an observer, you are the observed. The cycle repeats.",
                
                // Tela de trollagem
                trollMessage: "You've been trolled LOL",
                trollSubtitle: "After 200 questions, you're still going?",
                
                // Mensagens do sistema
                noMoreQuestions: "No more questions available. Starting final analysis...",
                systemReady: "System ready. Make your first response.",
                triggerDetected: "Trigger detected in your response."
            }
        };
        
        this.init();
    }
    
    init() {
        // Carregar idioma salvo
        const savedLang = localStorage.getItem('observer_lang');
        if (savedLang) this.state.language = savedLang;
        
        // Inicializar perguntas
        this.initializeQuestions();
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Iniciar interface
        this.updateUI();
        
        // Configurar detector de sequência admin
        this.setupAdminSequence();
        
        // Mostrar mensagem inicial
        this.displayNarratorMessage(this.texts[this.state.language].initialMessage);
    }
    
    setupAdminSequence() {
        document.addEventListener('keydown', (e) => {
            // Ignorar se o painel já está ativo
            if (this.adminActive) return;
            
            const key = e.key;
            
            // Iniciar temporizador na primeira tecla
            if (!this.adminStartTime) {
                this.adminStartTime = Date.now();
                this.adminSequence = '';
            }
            
            // Verificar se passou 5 segundos
            if (Date.now() - this.adminStartTime > 5000) {
                this.adminSequence = '';
                this.adminStartTime = Date.now();
                // Não mostramos mensagem para não chamar atenção
                return;
            }
            
            // Adicionar tecla à sequência
            this.adminSequence += key;
            
            // Verificar se a sequência contém "123"
            if (this.adminSequence.includes('123')) {
                this.activateAdminPanel();
                this.adminSequence = '';
                this.adminStartTime = null;
            }
            
            // Limitar o tamanho da sequência para evitar memory leak
            if (this.adminSequence.length > 10) {
                this.adminSequence = this.adminSequence.slice(-10);
            }
        });
    }
    
    activateAdminPanel() {
        this.adminActive = true;
        this.createAdminPanel();
        this.displayNarratorMessage(this.adminTexts[this.state.language].accessGranted);
    }
    
    createAdminPanel() {
        if (this.adminPanelCreated) return;
        
        const panel = document.createElement('div');
        panel.id = 'admin-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #0a0a0a;
            border: 2px solid #d4af37;
            border-radius: 8px;
            padding: 20px;
            z-index: 10000;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
            font-family: 'Inter', sans-serif;
        `;
        
        const title = document.createElement('h2');
        title.textContent = this.adminTexts[this.state.language].panelTitle;
        title.style.cssText = `
            color: #d4af37;
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #333;
            padding-bottom: 10px;
        `;
        
        const cheatsContainer = document.createElement('div');
        cheatsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        `;
        
        // Criar 8 botões de cheat
        const cheats = [
            { id: 1, text: this.adminTexts[this.state.language].cheat1, action: 'endGame' },
            { id: 2, text: this.adminTexts[this.state.language].cheat2, action: 'resetTriggers' },
            { id: 3, text: this.adminTexts[this.state.language].cheat3, action: 'addResponses' },
            { id: 4, text: this.adminTexts[this.state.language].cheat4, action: 'skipToTriggers' },
            { id: 5, text: this.adminTexts[this.state.language].cheat5, action: 'showAllResponses' },
            { id: 6, text: this.adminTexts[this.state.language].cheat6, action: 'resetGame' },
            { id: 7, text: this.adminTexts[this.state.language].cheat7, action: 'godMode' },
            { id: 8, text: this.adminTexts[this.state.language].cheat8, action: 'secretEnding' }
        ];
        
        cheats.forEach(cheat => {
            const button = document.createElement('button');
            button.textContent = cheat.text;
            button.style.cssText = `
                background-color: #222;
                color: #f0f0f0;
                border: 1px solid #444;
                padding: 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            `;
            
            button.onmouseover = () => {
                button.style.backgroundColor = '#333';
                button.style.borderColor = '#666';
            };
            
            button.onmouseout = () => {
                button.style.backgroundColor = '#222';
                button.style.borderColor = '#444';
            };
            
            button.onclick = () => this.executeAdminAction(cheat.action);
            
            cheatsContainer.appendChild(button);
        });
        
        const closeButton = document.createElement('button');
        closeButton.textContent = this.adminTexts[this.state.language].closePanel;
        closeButton.style.cssText = `
            width: 100%;
            background-color: #333;
            color: #f0f0f0;
            border: 1px solid #666;
            padding: 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 10px;
            transition: all 0.3s ease;
        `;
        
        closeButton.onmouseover = () => {
            closeButton.style.backgroundColor = '#444';
        };
        
        closeButton.onmouseout = () => {
            closeButton.style.backgroundColor = '#333';
        };
        
        closeButton.onclick = () => {
            this.closeAdminPanel();
        };
        
        panel.appendChild(title);
        panel.appendChild(cheatsContainer);
        panel.appendChild(closeButton);
        document.body.appendChild(panel);
        
        // Adicionar overlay
        const overlay = document.createElement('div');
        overlay.id = 'admin-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 9999;
        `;
        
        overlay.onclick = () => {
            this.closeAdminPanel();
        };
        
        document.body.appendChild(overlay);
        
        this.adminPanelCreated = true;
    }
    
    executeAdminAction(action) {
        const texts = this.adminTexts[this.state.language];
        
        switch(action) {
            case 'endGame':
                this.triggerEnding();
                this.displayNarratorMessage(texts.gameEnded);
                this.closeAdminPanel();
                break;
                
            case 'resetTriggers':
                this.state.triggerCount = 0;
                this.state.answeredTriggerQuestions.clear();
                this.updateUI();
                this.displayNarratorMessage(texts.triggersReset);
                this.closeAdminPanel();
                break;
                
            case 'addResponses':
                // Adicionar 50 respostas fictícias
                for (let i = 0; i < 50; i++) {
                    this.state.playerResponses.push({
                        question: `Pergunta admin #${i+1}`,
                        answer: `Resposta admin #${i+1}`,
                        isTrigger: false,
                        timestamp: new Date().toISOString()
                    });
                }
                this.state.responseCount += 50;
                this.updateUI();
                this.displayNarratorMessage(texts.responsesAdded);
                this.closeAdminPanel();
                break;
                
            case 'skipToTriggers':
                // Pular para perguntas gatilho
                this.state.questionCount = 200;
                this.state.askedQuestions = new Set(Array.from({length: 200}, (_, i) => i));
                this.updateUI();
                this.displayNarratorMessage(texts.skippedToTriggers);
                // Mostrar próxima pergunta gatilho
                const nextQuestion = this.getNextQuestion();
                if (nextQuestion) {
                    this.displayNarratorMessage(nextQuestion.text);
                }
                this.closeAdminPanel();
                break;
                
            case 'showAllResponses':
                console.log("=== TODAS AS RESPOSTAS DO JOGADOR ===");
                console.log(this.state.playerResponses);
                console.log("=====================================");
                this.displayNarratorMessage(texts.allResponses);
                this.closeAdminPanel();
                break;
                
            case 'resetGame':
                this.resetGame();
                this.displayNarratorMessage(texts.gameReset);
                this.closeAdminPanel();
                break;
                
            case 'godMode':
                // Ativar "modo deus" - todas as perguntas respondidas
                this.state.questionCount = 250;
                this.state.triggerCount = 50;
                this.state.answeredTriggerQuestions = new Set(Array.from({length: 50}, (_, i) => i));
                this.state.askedQuestions = new Set(Array.from({length: 200}, (_, i) => i));
                this.updateUI();
                this.displayNarratorMessage(texts.godMode);
                this.triggerEnding();
                this.closeAdminPanel();
                break;
                
            case 'secretEnding':
                // Ativar final secreto imediatamente
                this.state.triggerCount = 50;
                this.updateUI();
                this.triggerEnding();
                this.displayNarratorMessage(texts.secretEnding);
                this.closeAdminPanel();
                break;
        }
    }
    
    resetGame() {
        this.state = {
            language: this.state.language,
            questionCount: 0,
            triggerCount: 0,
            responseCount: 0,
            answeredTriggerQuestions: new Set(),
            askedQuestions: new Set(),
            playerResponses: [],
            gameActive: true,
            endingReached: false,
            trollScreenActive: false
        };
        
        // Reinicializar perguntas
        this.initializeQuestions();
        this.updateUI();
        
        // Limpar histórico de respostas
        document.getElementById('responses-list').innerHTML = '';
        
        // Reativar input
        document.getElementById('player-input').disabled = false;
        document.getElementById('submit-btn').disabled = false;
        
        // Mostrar mensagem inicial
        this.displayNarratorMessage(this.texts[this.state.language].initialMessage);
    }
    
    closeAdminPanel() {
        const panel = document.getElementById('admin-panel');
        const overlay = document.getElementById('admin-overlay');
        
        if (panel) panel.remove();
        if (overlay) overlay.remove();
        
        this.adminActive = false;
        this.adminPanelCreated = false;
        this.adminSequence = '';
        this.adminStartTime = null;
    }
    
    // ... O RESTO DO CÓDIGO PERMANECE IGUAL ATÉ O FIM DA CLASSE ...
    // (Mantenho todos os outros métodos exatamente como estavam antes)
    
    initializeQuestions() {
        // Gerar 200 perguntas dinâmicas ÚNICAS E DIFERENTES
        this.dynamicQuestions.pt = this.generateDynamicQuestionsPT();
        this.dynamicQuestions.en = this.generateDynamicQuestionsEN();
        
        // Gerar 50 perguntas gatilho específicas (o jogo pergunta ao usuário)
        const triggerTemplatesPT = [
            "Qual é o seu maior medo em relação à observação constante?",
            "Você acredita que suas ações seriam diferentes se não estivesse sendo observado?",
            "Como a observação afeta sua percepção de liberdade?",
            "Você já mentiu durante este questionário?",
            "Qual aspecto da sua personalidade você mais esconde dos outros?",
            "O que você mais valoriza: privacidade ou transparência?",
            "Você se considera uma pessoa observadora?",
            "Como você reage quando sente que está sendo julgado?",
            "A observação constante é uma forma de controle?",
            "Você já se sentiu traído por alguém que o observava?",
            "Até que ponto você se adapta ao ser observado?",
            "Você tem algo a esconder?",
            "A observação altera sua essência ou apenas seu comportamento?",
            "Você se sente mais vivo quando observado ou quando sozinho?",
            "O que você mais teme que seja descoberto sobre você?",
            "Você já observou alguém sem o consentimento dela?",
            "Como você define 'ser verdadeiro' consigo mesmo?",
            "A observação é uma violação ou uma necessidade?",
            "Você confia no sistema que está registrando suas respostas?",
            "Sua identidade é estável ou muda conforme o observador?",
            "Você se sente responsável por todas as suas ações?",
            "Há alguma pergunta que você se recusaria a responder?",
            "Você se considera previsível?",
            "Como você lida com a ideia de que nada é verdadeiramente privado?",
            "Você alteraria alguma resposta anterior se pudesse?",
            "A observação cria ou destrói a autenticidade?",
            "Você já se sentiu como um objeto de estudo?",
            "O que você espera obter desta experiência?",
            "Você se importa com o que pensam de você?",
            "Até que ponto você se conhece realmente?",
            "Você acredita em destino ou acaso?",
            "Como você reage ao desconhecido?",
            "Você se considera ético em todas as suas ações?",
            "A observação é uma forma de violência psicológica?",
            "Você tem dúvidas sobre sua própria sanidade?",
            "O que é mais importante: ser ou parecer?",
            "Você se sente dono das suas próprias decisões?",
            "Como você lida com a culpa?",
            "Você já questionou a realidade ao seu redor?",
            "O que você mais valoriza na vida?",
            "Você tem medo da morte?",
            "Como você define sucesso?",
            "Você se arrepende de algo que fez?",
            "O que você faria se tivesse certeza de que não seria observado?",
            "Você acredita que pessoas podem mudar verdadeiramente?",
            "Como você lida com a solidão?",
            "Você confia nas suas próprias memórias?",
            "O que é liberdade para você?",
            "Você se considera uma boa pessoa?",
            "O que você espera que aconteça após esta observação?"
        ];
        
        const triggerTemplatesEN = [
            "What is your greatest fear regarding constant observation?",
            "Do you believe your actions would be different if you weren't being observed?",
            "How does observation affect your perception of freedom?",
            "Have you lied during this questionnaire?",
            "Which aspect of your personality do you hide most from others?",
            "What do you value more: privacy or transparency?",
            "Do you consider yourself an observant person?",
            "How do you react when you feel judged?",
            "Is constant observation a form of control?",
            "Have you ever felt betrayed by someone who was observing you?",
            "To what extent do you adapt when being observed?",
            "Do you have something to hide?",
            "Does observation alter your essence or just your behavior?",
            "Do you feel more alive when observed or when alone?",
            "What do you most fear will be discovered about you?",
            "Have you ever observed someone without their consent?",
            "How do you define 'being true to yourself'?",
            "Is observation a violation or a necessity?",
            "Do you trust the system recording your responses?",
            "Is your identity stable or does it change according to the observer?",
            "Do you feel responsible for all your actions?",
            "Is there any question you would refuse to answer?",
            "Do you consider yourself predictable?",
            "How do you deal with the idea that nothing is truly private?",
            "Would you change any previous answer if you could?",
            "Does observation create or destroy authenticity?",
            "Have you ever felt like a study object?",
            "What do you hope to gain from this experience?",
            "Do you care about what others think of you?",
            "To what extent do you truly know yourself?",
            "Do you believe in destiny or chance?",
            "How do you react to the unknown?",
            "Do you consider yourself ethical in all your actions?",
            "Is observation a form of psychological violence?",
            "Do you have doubts about your own sanity?",
            "What is more important: being or seeming?",
            "Do you feel in control of your own decisions?",
            "How do you deal with guilt?",
            "Have you ever questioned the reality around you?",
            "What do you value most in life?",
            "Are you afraid of death?",
            "How do you define success?",
            "Do you regret anything you've done?",
            "What would you do if you were certain you wouldn't be observed?",
            "Do you believe people can truly change?",
            "How do you deal with loneliness?",
            "Do you trust your own memories?",
            "What is freedom to you?",
            "Do you consider yourself a good person?",
            "What do you expect to happen after this observation?"
        ];
        
        // Usar 50 templates para cada idioma
        for (let i = 0; i < 50; i++) {
            this.triggerQuestions.pt.push(triggerTemplatesPT[i]);
            this.triggerQuestions.en.push(triggerTemplatesEN[i]);
        }
        
        // Embaralhar perguntas dinâmicas
        this.shuffleArray(this.dynamicQuestions.pt);
        this.shuffleArray(this.dynamicQuestions.en);
    }
    
    generateDynamicQuestionsPT() {
        const questions = [];
        
        // 200 perguntas dinâmicas ÚNICAS em português
        const questionTemplatesPT = [
            "Descreva um momento em que você sentiu que estava sendo observado sem saber por quem.",
            "Como você reage quando percebe que alguém está te observando?",
            "Você já alterou seu comportamento por saber que estava sendo observado?",
            "O que você sente quando está em um lugar público e cercado por pessoas?",
            "Você tem a sensação de que suas ações online são monitoradas?",
            "Como seria um dia perfeito sem a sensação de ser observado?",
            "Você já descobriu que alguém estava te observando secretamente?",
            "Qual é a diferença entre ser observado e ser vigiado?",
            "Você se sente mais livre quando está sozinho?",
            "Como a observação constante afeta sua criatividade?",
            "Você já se sentiu julgado pelo olhar de alguém?",
            "O que você esconde mesmo quando ninguém está olhando?",
            "Como a tecnologia mudou a forma como somos observados?",
            "Você já observou alguém sem que a pessoa percebesse?",
            "Qual é o limite entre curiosidade e invasão de privacidade?",
            "Como você lida com câmeras de segurança em lugares públicos?",
            "Você acredita que tem algo a esconder?",
            "O que você pensa sobre a ideia de que 'quem não deve não teme'?",
            "Como a observação afeta suas decisões mais importantes?",
            "Você já mentiu para parecer melhor aos olhos dos outros?",
            "Qual é a pior coisa que alguém poderia descobrir observando você?",
            "Como você se sente quando fica sozinho no escuro?",
            "Você tem medo do silêncio e da solidão?",
            "O que você mais valoriza na sua privacidade?",
            "Você já teve a sensação de que seu quarto não era realmente seu?",
            "Como você reage a espelhos em lugares inesperados?",
            "Você acredita em intuição ou 'sexto sentido'?",
            "Já sentiu que estava sendo observado mesmo quando estava sozinho?",
            "O que você faz quando sente que algo não está certo?",
            "Você confia nas pessoas ao seu redor?",
            "Como é a sensação de estar verdadeiramente sozinho?",
            "Você já encontrou algo que não deveria ter visto?",
            "O que você faria se descobrisse uma câmera escondida na sua casa?",
            "Como a arquitetura dos espaços afeta a sensação de ser observado?",
            "Você presta atenção nas sombras e movimentos periféricos?",
            "O que você pensa sobre teorias da conspiração?",
            "Você já sentiu que estava em um experimento social sem saber?",
            "Como você lida com a ideia de que seus dados estão sendo coletados?",
            "Você se sente observado mesmo quando está dormindo?",
            "O que é mais assustador: ser observado ou nunca ser notado?",
            "Você já teve pesadelos sobre ser observado?",
            "Como a cultura afeta a forma como lidamos com a privacidade?",
            "Você acredita que animais podem sentir quando estão sendo observados?",
            "O que você pensa sobre a observação científica de comportamentos?",
            "Você já se sentiu como um animal em um zoológico?",
            "Como a arte representa a ideia de observação?",
            "Você se sente diferente quando tira uma selfie?",
            "O que há por trás do seu sorriso nas fotos?",
            "Você já fingiu estar ocupado para evitar interações?",
            "Como você age quando sabe que está sendo filmado?",
            "O que você esconde no seu histórico de navegação?",
            "Você tem senhas que ninguém mais conhece?",
            "Qual é o seu segredo mais bem guardado?",
            "Você já escreveu algo que nunca mostrou a ninguém?",
            "Como você se sente quando alguém mexe nas suas coisas?",
            "O que você faria se tivesse 24 horas de anonimato completo?",
            "Você acredita que pode ser completamente sincero consigo mesmo?",
            "Qual parte da sua personalidade você nunca revelou a ninguém?",
            "Como você lida com memórias embaraçosas?",
            "Você já deletou algo das redes sociais por medo de julgamento?",
            "O que você pensa quando vê janelas escuras à noite?",
            "Você fecha as cortinas mesmo quando não há ninguém por perto?",
            "Como é a sensação de andar em uma rua deserta à noite?",
            "Você já sentiu presenças em lugares vazios?",
            "O que você faria se visse um par de olhos te observando no escuro?",
            "Como você reage a barulhos inexplicáveis à noite?",
            "Você verifica se as portas estão trancadas antes de dormir?",
            "O que há debaixo da sua cama?",
            "Você já acordou com a sensação de que não estava sozinho?",
            "Como é a sua relação com espelhos no quarto?",
            "Você evita se olhar no espelho em certos momentos?",
            "O que você vê quando olha profundamente nos seus próprios olhos?",
            "Você acredita que os olhos são a janela da alma?",
            "Como você reage ao contato visual prolongado?",
            "O que você esconde atrás dos seus olhos?",
            "Você já sentiu que alguém podia ler seus pensamentos?",
            "Como é a sensação de ter seus pensamentos invadidos?",
            "Você fala sozinho quando acredita que está sozinho?",
            "O que você diz para si mesmo quando ninguém está ouvindo?",
            "Como você se sente sobre a possibilidade de leitura da mente?",
            "Você tem pensamentos que nunca compartilhou com ninguém?",
            "Qual é o seu pensamento mais obscuro?",
            "Você acredita que pensamentos podem ser observados?",
            "Como você lida com a ideia de vigilância governamental?",
            "O que você faria se soubesse que todas suas conversas são gravadas?",
            "Você já se autocensurou por medo de vigilância?",
            "Como a ficção científica retrata a observação?",
            "Você já se identificou com personagens que eram observados?",
            "O que você aprendeu sobre si mesmo sendo observado?",
            "Como esta experiência de jogo está afetando você?",
            "Você está sendo sincero em todas as suas respostas?",
            "O que você espera que eu descubra sobre você?",
            "Você já mentiu nesta sessão?",
            "Como você se sente sabendo que todas as respostas estão sendo registradas?",
            "Você acha que eu posso prever suas próximas respostas?",
            "O que você faria se pudesse me observar?",
            "Você acredita que estou realmente te observando?",
            "Como você define 'observação'?",
            "Qual é a diferença entre observar e ser observado?",
            "Você já se sentiu como um espectador da própria vida?",
            "O que você vê quando observa a si mesmo?",
            "Como você reage a críticas?",
            "Você se importa com a opinião dos outros?",
            "O que você mudaria se ninguém nunca descobrisse?",
            "Você já traiu a confiança de alguém?",
            "Como você lida com a culpa?",
            "O que você faria se tivesse um poder de invisibilidade?",
            "Você já desejou desaparecer?",
            "Como é a sensação de ser completamente anônimo?",
            "O que você esconde atrás da sua personalidade pública?",
            "Você tem um diário ou local secreto para seus pensamentos?",
            "Como você se sente sobre a morte?",
            "O que você acredita que acontece após a morte?",
            "Você tem medo de ser esquecido?",
            "Como você quer ser lembrado?",
            "O que você deixou para trás que ninguém sabe?",
            "Você já mentiu sobre quem você é?",
            "Qual é a sua verdadeira face?",
            "O que você mostra ao mundo e o que esconde?",
            "Como você reage quando alguém descobre seu segredo?",
            "Você já foi chantageado?",
            "O que você faria se tivesse um segredo comprometedor?",
            "Como você lida com a possibilidade de exposição?",
            "Você confia em sistemas eletrônicos?",
            "O que você pensa sobre inteligência artificial?",
            "Você acredita que máquinas podem nos observar?",
            "Como a tecnologia mudou sua privacidade?",
            "Você já sentiu que um algoritmo te conhecia melhor que seus amigos?",
            "O que você busca quando está sozinho na internet?",
            "Você tem comportamentos online que não teria na vida real?",
            "Como você se sente sobre rastreamento de dados?",
            "Você já pesquisou algo que não quer que ninguém saiba?",
            "O que você apagaria da internet se pudesse?",
            "Como você protege sua privacidade digital?",
            "Você acredita que privacidade ainda existe?",
            "O que você faria se sua privacidade fosse completamente violada?",
            "Como você reage a notícias sobre vazamentos de dados?",
            "Você já foi vítima de invasão de privacidade?",
            "O que você esconde no seu celular?",
            "Você tem medo de ser hackeado?",
            "Como você se sente sobre câmeras em dispositivos?",
            "Você já cobriu a câmera do seu computador?",
            "O que você pensa sobre assistentes virtuais?",
            "Você acredita que estão ouvindo suas conversas?",
            "Como você age quando sabe que um microfone está ativo?",
            "O que você não diria perto de um dispositivo inteligente?",
            "Você já desligou um dispositivo por medo de vigilância?",
            "Como a observação afeta suas relações pessoais?",
            "Você já observou alguém que ama sem que ela soubesse?",
            "O que você esconde do seu parceiro ou familiares?",
            "Você tem segredos que nunca contou para ninguém?",
            "Como você reage quando alguém invade seu espaço pessoal?",
            "O que você considera invasão de privacidade?",
            "Você já invadiu a privacidade de alguém?",
            "Como você se sente quando alguém mexe no seu telefone?",
            "O que você não quer que vejam no seu quarto?",
            "Você tranca a porta do banheiro?",
            "Como você age quando está sendo observado no trabalho?",
            "O que você faz quando ninguém está supervisionando?",
            "Você já fingiu estar trabalhando?",
            "Como a observação afeta sua produtividade?",
            "O que você pensa sobre monitoramento de funcionários?",
            "Você já burlou regras quando ninguém estava olhando?",
            "Como você reage a testes de integridade?",
            "O que você faria se visse alguém roubando?",
            "Você já pegou algo que não era seu?",
            "Como você lida com a tentação quando ninguém vê?",
            "O que você pensa sobre câmeras em lojas?",
            "Você já mudou de comportamento ao ver uma câmera?",
            "Como é a sensação de estar em um reality show?",
            "Você agiria diferente se estivesse sendo filmado?",
            "O que você pensa sobre exposição nas redes sociais?",
            "Você já postou algo e depois se arrependeu?",
            "Como você cuida da sua imagem online?",
            "O que você esconde nas suas redes sociais?",
            "Você tem perfis falsos ou secretos?",
            "Como você reage a comentários negativos online?",
            "O que você não postaria nunca?",
            "Você já stalkeou alguém online?",
            "Como você se sente sendo stalkeado?",
            "O que você faria se descobrisse que alguém te stalkeia?",
            "Você já ficou obcecado por observar alguém?",
            "Como é a linha entre interesse e obsessão?",
            "O que você pensa sobre voyeurismo?",
            "Você já assistiu algo que não deveria?",
            "Como você reage a situações íntimas alheias?",
            "O que você considera íntimo demais para observar?",
            "Você já se sentiu exposto involuntariamente?",
            "Como você protege sua intimidade?",
            "O que você faria se sua intimidade fosse exposta?",
            "Você já compartilhou algo íntimo e se arrependeu?",
            "Como você lida com a vergonha?",
            "O que você mais teme que seja descoberto?",
            "Você acredita que todos temos segredos inconfessáveis?",
            "Como você lida com a culpa de um segredo?",
            "O que você confessaria se tivesse anonimato garantido?",
            "Você já confessou algo anonimamente?",
            "Como é a sensação de alívio após uma confissão?",
            "O que você nunca confessaria nem sob anonimato?",
            "Você acredita em redenção?",
            "Como você lida com seus erros do passado?",
            "O que você gostaria de apagar da sua história?",
            "Você já reinventou quem você é?",
            "Como você se vê daqui a 10 anos?",
            "O que você espera que eu veja em você?",
            "Você acredita que estou te julgando?",
            "Como você reage ao julgamento alheio?",
            "O que você pensa sobre minha observação?",
            "Você gostaria de me fazer alguma pergunta?",
            "Como esta interação está mudando você?",
            "O que você aprendeu sobre observação até agora?",
            "Você se observa mais agora?",
            "Como você se sente sendo parte deste experimento?",
            "O que você diria para outras pessoas sobre esta experiência?",
            "Você recomendaria este jogo para alguém?",
            "Como você definiria esta interação em uma palavra?",
            "O que você espera que aconteça no final?",
            "Você tem medo do final?",
            "Como você lida com o desconhecido?",
            "O que você busca nesta experiência?",
            "Você encontrou o que procurava?",
            "Como esta observação difere de outras em sua vida?",
            "O que você mudaria nesta interação?",
            "Você acredita que estou realmente aqui?"
        ];
        
        // Garantir que temos exatamente 200 perguntas
        if (questionTemplatesPT.length < 200) {
            // Se por algum motivo não tivermos 200, completamos com variações
            for (let i = questionTemplatesPT.length; i < 200; i++) {
                questionTemplatesPT.push(`Reflexão #${i+1}: Como a observação constante molda nossa percepção da realidade?`);
            }
        }
        
        return questionTemplatesPT.slice(0, 200);
    }
    
    generateDynamicQuestionsEN() {
        const questions = [];
        
        // 200 perguntas dinâmicas ÚNICAS em inglês (traduções das portuguesas)
        const questionTemplatesEN = [
            "Describe a moment when you felt you were being watched without knowing by whom.",
            "How do you react when you realize someone is watching you?",
            "Have you ever changed your behavior because you knew you were being observed?",
            "What do you feel when you are in a public place surrounded by people?",
            "Do you have the feeling that your online actions are monitored?",
            "What would a perfect day be like without the feeling of being observed?",
            "Have you ever discovered someone was secretly watching you?",
            "What is the difference between being observed and being surveilled?",
            "Do you feel freer when you are alone?",
            "How does constant observation affect your creativity?",
            "Have you ever felt judged by someone's gaze?",
            "What do you hide even when no one is looking?",
            "How has technology changed the way we are observed?",
            "Have you ever watched someone without them noticing?",
            "What is the limit between curiosity and invasion of privacy?",
            "How do you deal with security cameras in public places?",
            "Do you believe you have something to hide?",
            "What do you think about the idea that 'innocent people have nothing to fear'?",
            "How does observation affect your most important decisions?",
            "Have you ever lied to look better in the eyes of others?",
            "What is the worst thing someone could discover by watching you?",
            "How do you feel when you are alone in the dark?",
            "Are you afraid of silence and loneliness?",
            "What do you value most about your privacy?",
            "Have you ever felt that your room wasn't really yours?",
            "How do you react to mirrors in unexpected places?",
            "Do you believe in intuition or 'sixth sense'?",
            "Have you ever felt watched even when you were alone?",
            "What do you do when you feel something isn't right?",
            "Do you trust the people around you?",
            "What does it feel like to be truly alone?",
            "Have you ever found something you shouldn't have seen?",
            "What would you do if you discovered a hidden camera in your house?",
            "How does the architecture of spaces affect the feeling of being observed?",
            "Do you pay attention to shadows and peripheral movements?",
            "What do you think about conspiracy theories?",
            "Have you ever felt like you were in a social experiment without knowing?",
            "How do you deal with the idea that your data is being collected?",
            "Do you feel observed even when you are sleeping?",
            "What is scarier: being observed or never being noticed?",
            "Have you ever had nightmares about being watched?",
            "How does culture affect how we deal with privacy?",
            "Do you believe animals can feel when they are being watched?",
            "What do you think about scientific observation of behaviors?",
            "Have you ever felt like an animal in a zoo?",
            "How does art represent the idea of observation?",
            "Do you feel different when you take a selfie?",
            "What is behind your smile in photos?",
            "Have you ever pretended to be busy to avoid interactions?",
            "How do you act when you know you are being filmed?",
            "What do you hide in your browsing history?",
            "Do you have passwords that no one else knows?",
            "What is your best-kept secret?",
            "Have you ever written something you never showed anyone?",
            "How do you feel when someone goes through your things?",
            "What would you do if you had 24 hours of complete anonymity?",
            "Do you believe you can be completely honest with yourself?",
            "Which part of your personality have you never revealed to anyone?",
            "How do you deal with embarrassing memories?",
            "Have you ever deleted something from social media out of fear of judgment?",
            "What do you think when you see dark windows at night?",
            "Do you close the curtains even when there's no one around?",
            "What does it feel like to walk on a deserted street at night?",
            "Have you ever felt presences in empty places?",
            "What would you do if you saw a pair of eyes watching you in the dark?",
            "How do you react to unexplained noises at night?",
            "Do you check if the doors are locked before sleeping?",
            "What's under your bed?",
            "Have you ever woken up feeling like you weren't alone?",
            "What is your relationship with mirrors in the bedroom?",
            "Do you avoid looking in the mirror at certain times?",
            "What do you see when you look deeply into your own eyes?",
            "Do you believe eyes are the window to the soul?",
            "How do you react to prolonged eye contact?",
            "What do you hide behind your eyes?",
            "Have you ever felt like someone could read your thoughts?",
            "What does it feel like to have your thoughts invaded?",
            "Do you talk to yourself when you believe you are alone?",
            "What do you say to yourself when no one is listening?",
            "How do you feel about the possibility of mind reading?",
            "Do you have thoughts you've never shared with anyone?",
            "What is your darkest thought?",
            "Do you believe thoughts can be observed?",
            "How do you deal with the idea of government surveillance?",
            "What would you do if you knew all your conversations were being recorded?",
            "Have you ever self-censored out of fear of surveillance?",
            "How does science fiction portray observation?",
            "Have you ever identified with characters who were being observed?",
            "What have you learned about yourself by being observed?",
            "How is this gaming experience affecting you?",
            "Are you being honest in all your answers?",
            "What do you hope I discover about you?",
            "Have you lied in this session?",
            "How do you feel knowing all answers are being recorded?",
            "Do you think I can predict your next answers?",
            "What would you do if you could observe me?",
            "Do you believe I am really watching you?",
            "How do you define 'observation'?",
            "What is the difference between observing and being observed?",
            "Have you ever felt like a spectator of your own life?",
            "What do you see when you observe yourself?",
            "How do you react to criticism?",
            "Do you care about other people's opinions?",
            "What would you change if no one ever found out?",
            "Have you ever betrayed someone's trust?",
            "How do you deal with guilt?",
            "What would you do if you had the power of invisibility?",
            "Have you ever wished to disappear?",
            "What does it feel like to be completely anonymous?",
            "What do you hide behind your public personality?",
            "Do you have a diary or secret place for your thoughts?",
            "How do you feel about death?",
            "What do you believe happens after death?",
            "Are you afraid of being forgotten?",
            "How do you want to be remembered?",
            "What have you left behind that no one knows?",
            "Have you ever lied about who you are?",
            "What is your true face?",
            "What do you show the world and what do you hide?",
            "How do you react when someone discovers your secret?",
            "Have you ever been blackmailed?",
            "What would you do if you had a compromising secret?",
            "How do you deal with the possibility of exposure?",
            "Do you trust electronic systems?",
            "What do you think about artificial intelligence?",
            "Do you believe machines can watch us?",
            "How has technology changed your privacy?",
            "Have you ever felt that an algorithm knew you better than your friends?",
            "What do you search for when you are alone on the internet?",
            "Do you have online behaviors you wouldn't have in real life?",
            "How do you feel about data tracking?",
            "Have you ever searched for something you don't want anyone to know?",
            "What would you delete from the internet if you could?",
            "How do you protect your digital privacy?",
            "Do you believe privacy still exists?",
            "What would you do if your privacy was completely violated?",
            "How do you react to news about data leaks?",
            "Have you ever been a victim of privacy invasion?",
            "What do you hide on your phone?",
            "Are you afraid of being hacked?",
            "How do you feel about cameras on devices?",
            "Have you ever covered your computer's camera?",
            "What do you think about virtual assistants?",
            "Do you believe they are listening to your conversations?",
            "How do you act when you know a microphone is active?",
            "What wouldn't you say near a smart device?",
            "Have you ever turned off a device out of fear of surveillance?",
            "How does observation affect your personal relationships?",
            "Have you ever watched someone you love without them knowing?",
            "What do you hide from your partner or family?",
            "Do you have secrets you've never told anyone?",
            "How do you react when someone invades your personal space?",
            "What do you consider an invasion of privacy?",
            "Have you ever invaded someone's privacy?",
            "How do you feel when someone goes through your phone?",
            "What don't you want people to see in your room?",
            "Do you lock the bathroom door?",
            "How do you act when you are being observed at work?",
            "What do you do when no one is supervising?",
            "Have you ever pretended to be working?",
            "How does observation affect your productivity?",
            "What do you think about employee monitoring?",
            "Have you ever broken rules when no one was looking?",
            "How do you react to integrity tests?",
            "What would you do if you saw someone stealing?",
            "Have you ever taken something that wasn't yours?",
            "How do you deal with temptation when no one sees?",
            "What do you think about cameras in stores?",
            "Have you ever changed behavior upon seeing a camera?",
            "What does it feel like to be on a reality show?",
            "Would you act differently if you were being filmed?",
            "What do you think about exposure on social media?",
            "Have you ever posted something and then regretted it?",
            "How do you take care of your online image?",
            "What do you hide on your social media?",
            "Do you have fake or secret profiles?",
            "How do you react to negative comments online?",
            "What would you never post?",
            "Have you ever stalked someone online?",
            "How do you feel being stalked?",
            "What would you do if you discovered someone is stalking you?",
            "Have you ever become obsessed with watching someone?",
            "What is the line between interest and obsession?",
            "What do you think about voyeurism?",
            "Have you ever watched something you shouldn't have?",
            "How do you react to others' intimate situations?",
            "What do you consider too intimate to observe?",
            "Have you ever felt involuntarily exposed?",
            "How do you protect your intimacy?",
            "What would you do if your intimacy was exposed?",
            "Have you ever shared something intimate and regretted it?",
            "How do you deal with shame?",
            "What do you most fear being discovered?",
            "Do you believe we all have unconfessable secrets?",
            "How do you deal with the guilt of a secret?",
            "What would you confess if you had guaranteed anonymity?",
            "Have you ever confessed something anonymously?",
            "What does the feeling of relief after confession feel like?",
            "What would you never confess even under anonymity?",
            "Do you believe in redemption?",
            "How do you deal with your past mistakes?",
            "What would you like to erase from your history?",
            "Have you ever reinvented who you are?",
            "How do you see yourself in 10 years?",
            "What do you hope I see in you?",
            "Do you believe I am judging you?",
            "How do you react to others' judgment?",
            "What do you think about my observation?",
            "Would you like to ask me any question?",
            "How is this interaction changing you?",
            "What have you learned about observation so far?",
            "Do you observe yourself more now?",
            "How do you feel being part of this experiment?",
            "What would you tell other people about this experience?",
            "Would you recommend this game to someone?",
            "How would you define this interaction in one word?",
            "What do you hope happens at the end?",
            "Are you afraid of the end?",
            "How do you deal with the unknown?",
            "What are you seeking in this experience?",
            "Have you found what you were looking for?",
            "How does this observation differ from others in your life?",
            "What would you change about this interaction?",
            "Do you believe I am really here?"
        ];
        
        // Garantir que temos exatamente 200 perguntas
        if (questionTemplatesEN.length < 200) {
            // Se por algum motivo não tivermos 200, completamos com variações
            for (let i = questionTemplatesEN.length; i < 200; i++) {
                questionTemplatesEN.push(`Reflection #${i+1}: How does constant observation shape our perception of reality?`);
            }
        }
        
        return questionTemplatesEN.slice(0, 200);
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    setupEventListeners() {
        // Botão de idioma
        document.getElementById('language-toggle').addEventListener('click', () => {
            this.toggleLanguage();
        });
        
        // Botão de apoio
        document.getElementById('support-btn').addEventListener('click', () => {
            window.location.href = 'apoio.html';
        });
        
        // Input do jogador
        const playerInput = document.getElementById('player-input');
        const submitBtn = document.getElementById('submit-btn');
        
        submitBtn.addEventListener('click', () => {
            this.processPlayerInput();
        });
        
        playerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processPlayerInput();
            }
        });
    }
    
    toggleLanguage() {
        this.state.language = this.state.language === 'pt' ? 'en' : 'pt';
        localStorage.setItem('observer_lang', this.state.language);
        this.updateUI();
        
        // Atualizar mensagem do narrador se o jogo ainda não começou
        if (this.state.questionCount === 0) {
            this.displayNarratorMessage(this.texts[this.state.language].initialMessage);
        }
    }
    
    updateUI() {
        const texts = this.texts[this.state.language];
        
        // Atualizar textos
        document.getElementById('game-title').textContent = texts.gameTitle;
        document.getElementById('support-text').textContent = texts.supportBtn;
        document.getElementById('questions-text').textContent = texts.questionsText;
        document.getElementById('trigger-text').textContent = texts.triggerText;
        document.getElementById('responses-text').textContent = texts.responsesText;
        document.getElementById('submit-text').textContent = texts.submitText;
        document.getElementById('responses-title').textContent = texts.responsesTitle;
        document.getElementById('footer-text').textContent = texts.footerText;
        document.getElementById('language-text').textContent = texts.languageBtn;
        document.getElementById('player-input').placeholder = texts.inputPlaceholder;
        
        // Atualizar contadores
        document.getElementById('question-counter').textContent = this.state.questionCount;
        document.getElementById('trigger-counter').textContent = `${this.state.triggerCount}/50`;
        document.getElementById('response-counter').textContent = this.state.responseCount;
    }
    
    displayNarratorMessage(message) {
        const narratorText = document.getElementById('narrator-text');
        narratorText.textContent = message;
        
        // Scroll para a área de texto
        document.querySelector('.game-text').scrollTop = document.querySelector('.game-text').scrollHeight;
    }
    
    showTrollScreen() {
        this.state.trollScreenActive = true;
        
        // Criar overlay preto
        const overlay = document.createElement('div');
        overlay.id = 'troll-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-family: 'Inter', sans-serif;
        `;
        
        const trollText = document.createElement('div');
        trollText.style.cssText = `
            font-size: 3rem;
            color: #d4af37;
            margin-bottom: 20px;
            text-align: center;
            animation: pulse 2s infinite;
        `;
        
        const trollSubtitle = document.createElement('div');
        trollSubtitle.style.cssText = `
            font-size: 1.2rem;
            color: #aaa;
            margin-bottom: 40px;
            text-align: center;
        `;
        
        const continueText = document.createElement('div');
        continueText.style.cssText = `
            font-size: 1rem;
            color: #666;
            margin-top: 40px;
            text-align: center;
            animation: fadeInOut 3s infinite;
        `;
        
        trollText.textContent = this.texts[this.state.language].trollMessage;
        trollSubtitle.textContent = this.texts[this.state.language].trollSubtitle;
        continueText.textContent = this.state.language === 'pt' 
            ? "O jogo continua automaticamente em 5 segundos..." 
            : "The game continues automatically in 5 seconds...";
        
        // Adicionar estilos CSS para animações
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 0.5; }
                50% { opacity: 1; }
                100% { opacity: 0.5; }
            }
            @keyframes fadeInOut {
                0% { opacity: 0.3; }
                50% { opacity: 1; }
                100% { opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);
        
        overlay.appendChild(trollText);
        overlay.appendChild(trollSubtitle);
        overlay.appendChild(continueText);
        document.body.appendChild(overlay);
        
        // Remover a tela após 5 segundos e continuar
        setTimeout(() => {
            document.body.removeChild(overlay);
            this.state.trollScreenActive = false;
            
            // Continuar com as perguntas gatilho
            this.continueAfterTroll();
        }, 5000);
    }
    
    continueAfterTroll() {
        // Continuar com as perguntas gatilho restantes
        const nextQuestion = this.getNextQuestion();
        if (nextQuestion) {
            this.displayNarratorMessage(nextQuestion.text);
        }
    }
    
    getNextQuestion() {
        // Verificar se já alcançamos um final
        if (this.state.endingReached || this.state.trollScreenActive) return null;
        
        // Verificar se já respondemos todas as 250 perguntas
        if (this.state.questionCount >= 250) {
            this.triggerEnding();
            return null;
        }
        
        // Verificar se respondemos 200 perguntas dinâmicas (mostrar tela de trollagem)
        if (this.state.questionCount === 200 && this.state.triggerCount < 50) {
            // Mostrar tela de trollagem
            this.showTrollScreen();
            return null;
        }
        
        let question;
        let isTrigger = false;
        
        // Se ainda temos perguntas gatilho não respondidas (após as 200 dinâmicas)
        if (this.state.questionCount >= 200 && this.state.triggerCount < 50) {
            // Encontrar uma pergunta gatilho não feita
            const availableTriggers = this.triggerQuestions[this.state.language].filter((_, index) => 
                !this.state.answeredTriggerQuestions.has(index)
            );
            
            if (availableTriggers.length > 0) {
                question = availableTriggers[0];
                const originalIndex = this.triggerQuestions[this.state.language].indexOf(question);
                this.state.answeredTriggerQuestions.add(originalIndex);
                isTrigger = true;
            }
        } else {
            // Antes de 200 perguntas, usar perguntas dinâmicas
            // Encontrar uma pergunta dinâmica não feita
            const availableDynamics = this.dynamicQuestions[this.state.language].filter((_, index) => 
                !this.state.askedQuestions.has(index)
            );
            
            if (availableDynamics.length > 0) {
                question = availableDynamics[0];
                const originalIndex = this.dynamicQuestions[this.state.language].indexOf(question);
                this.state.askedQuestions.add(originalIndex);
            }
        }
        
        // Se não encontrou nenhuma pergunta
        if (!question) {
            this.triggerEnding();
            return null;
        }
        
        return { text: question, isTrigger };
    }
    
    checkForUserTrigger(answer) {
        const triggers = this.userTriggers[this.state.language];
        const lowerAnswer = answer.toLowerCase().trim();
        
        for (const triggerObj of triggers) {
            if (lowerAnswer.includes(triggerObj.trigger)) {
                return triggerObj.response;
            }
        }
        
        return null;
    }
    
    processPlayerInput() {
        if (!this.state.gameActive || this.state.trollScreenActive) return;
        
        const input = document.getElementById('player-input');
        const answer = input.value.trim();
        
        if (answer === '') return;
        
        // Verificar se a resposta contém um gatilho do usuário
        const triggerResponse = this.checkForUserTrigger(answer);
        if (triggerResponse) {
            // Adicionar resposta do usuário ao histórico
            const currentQuestion = document.getElementById('narrator-text').textContent;
            this.state.playerResponses.push({
                question: currentQuestion,
                answer: answer,
                isTrigger: false,
                timestamp: new Date().toISOString()
            });
            
            // Atualizar contador de respostas
            this.state.responseCount++;
            this.updateUI();
            
            // Adicionar ao histórico
            this.addToResponseHistory(currentQuestion, answer);
            
            // Mostrar resposta do gatilho
            this.displayNarratorMessage(triggerResponse);
            
            // Limpar input
            input.value = '';
            input.focus();
            return;
        }
        
        // Obter próxima pergunta (se for a primeira resposta, já temos uma pergunta)
        const questionObj = this.getNextQuestion();
        
        // Se não há mais perguntas e não estamos em final
        if (!questionObj && !this.state.endingReached) {
            this.displayNarratorMessage(this.texts[this.state.language].noMoreQuestions);
            setTimeout(() => this.triggerEnding(), 2000);
            input.value = '';
            return;
        }
        
        // Se temos uma pergunta para responder
        if (questionObj) {
            // Registrar resposta
            this.state.playerResponses.push({
                question: questionObj.text,
                answer: answer,
                isTrigger: questionObj.isTrigger,
                timestamp: new Date().toISOString()
            });
            
            // Atualizar contadores
            this.state.questionCount++;
            this.state.responseCount++;
            
            if (questionObj.isTrigger) {
                this.state.triggerCount++;
            }
            
            // Atualizar UI
            this.updateUI();
            
            // Adicionar ao histórico
            this.addToResponseHistory(questionObj.text, answer);
            
            // Obter próxima pergunta
            const nextQuestionObj = this.getNextQuestion();
            
            if (nextQuestionObj) {
                this.displayNarratorMessage(nextQuestionObj.text);
            } else if (!this.state.endingReached) {
                this.displayNarratorMessage(this.texts[this.state.language].noMoreQuestions);
                setTimeout(() => this.triggerEnding(), 2000);
            }
        }
        
        // Limpar input
        input.value = '';
        input.focus();
    }
    
    addToResponseHistory(question, answer) {
        const responsesList = document.getElementById('responses-list');
        const responseItem = document.createElement('div');
        responseItem.className = 'response-item';
        
        // Encurtar textos muito longos
        const shortQuestion = question.length > 50 ? question.substring(0, 47) + '...' : question;
        const shortAnswer = answer.length > 30 ? answer.substring(0, 27) + '...' : answer;
        
        responseItem.innerHTML = `
            <div class="response-question">${shortQuestion}</div>
            <div class="response-answer">${shortAnswer}</div>
        `;
        
        responsesList.appendChild(responseItem);
        
        // Scroll para o final
        responsesList.scrollTop = responsesList.scrollHeight;
    }
    
    triggerEnding() {
        this.state.gameActive = false;
        this.state.endingReached = true;
        
        // Determinar qual final mostrar
        let endingMessage;
        
        if (this.state.triggerCount >= 50) {
            // Final secreto (todas as 50 perguntas gatilho respondidas)
            endingMessage = this.texts[this.state.language].secretEnding;
        } else if (this.state.questionCount >= 30) {
            // Final comum
            endingMessage = this.texts[this.state.language].commonEnding;
        } else {
            // Final incompleto
            endingMessage = this.texts[this.state.language].incompleteEnding;
        }
        
        // Mostrar final após um delay
        setTimeout(() => {
            this.displayNarratorMessage(endingMessage);
            document.getElementById('player-input').disabled = true;
            document.getElementById('submit-btn').disabled = true;
        }, 1000);
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.game = new ObserverGame();
});