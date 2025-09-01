// Sistema de Demonstração do Projeto Finzzy
class FinzzyDemo {
    constructor() {
        this.currentScreen = 1;
        this.totalScreens = 9;
        this.screens = this.initializeScreens();
        this.init();
    }

    initializeScreens() {
        return {
            1: {
                image: 'assets/images/finzzy-demo/print 1 finzzy.jpg',
                title: 'Dashboard Principal - Visão Geral Financeira',
                description: [
                    'Dashboard central com visão geral das finanças, receitas, despesas e métricas importantes.',
                    'Gráficos por categoria, transações recentes e resumo de receitas e despesas.',
                    'Interface intuitiva com navegação rápida e métricas em tempo real.'
                ]
            },
            2: {
                image: 'assets/images/finzzy-demo/print 2 finnzy.jpg',
                title: 'Lista de Transações - Busca e Filtros',
                description: [
                    'Lista completa de todas as transações financeiras com sistema de busca e filtros avançados.',
                    'Busca por receitas e despesas, filtros por categoria e período.',
                    'Histórico completo de transações com navegação intuitiva e organização por data.'
                ]
            },
            3: {
                image: 'assets/images/finzzy-demo/print 3 finnzy.jpg',
                title: 'Nova Transação - Criação e Edição',
                description: [
                    'Formulário completo para criar novas transações financeiras (receitas ou despesas).',
                    'Seleção de tipo, categorização, valor, data e descrição da transação.',
                    'Validação em tempo real e armazenamento local seguro dos dados.'
                ]
            },
            4: {
                image: 'assets/images/finzzy-demo/print 4 finnzy.jpg',
                title: 'Relatórios com Gráficos - Comparação Mensal',
                description: [
                    'Relatórios detalhados com gráficos de comparação mensal de receitas e despesas.',
                    'Evolução do saldo ao longo do tempo com visualização de tendências.',
                    'Análise comparativa entre meses para identificar padrões financeiros.'
                ]
            },
            5: {
                image: 'assets/images/finzzy-demo/print 5 finnzy.jpg',
                title: 'Análise por Categoria - Gastos e Receitas',
                description: [
                    'Visualização detalhada dos gastos por categoria com gráficos e estatísticas.',
                    'Maiores receitas e maiores despesas organizadas por categoria.',
                    'Análise comparativa entre categorias para identificar onde mais se gasta e recebe.'
                ]
            },
            6: {
                image: 'assets/images/finzzy-demo/print 6 finnzy.jpg',
                title: 'Limites de Gasto - Controle Mensal',
                description: [
                    'Definição de limites de gasto mensal para controle financeiro.',
                    'Limites por categoria para evitar gastos excessivos em áreas específicas.',
                    'Alertas quando os limites são atingidos e controle de orçamento por período.'
                ]
            },
            7: {
                image: 'assets/images/finzzy-demo/print 7 finnzy.jpg',
                title: 'Definição de Orçamento - Planejamento Financeiro',
                description: [
                    'Definição e controle de orçamento mensal para planejamento financeiro.',
                    'Configuração de metas de gastos e receitas por categoria.',
                    'Acompanhamento do progresso do orçamento e ajustes conforme necessário.'
                ]
            },
            8: {
                image: 'assets/images/finzzy-demo/print 8 finnzy.jpg',
                title: 'Análise Completa - Visão Geral Financeira',
                description: [
                    'Análise completa de todas as receitas, despesas e categorias financeiras.',
                    'Contas do banco, tendências mensais e métricas detalhadas de performance.',
                    'Visão consolidada para tomada de decisões financeiras estratégicas.'
                ]
            },
            9: {
                image: 'assets/images/finzzy-demo/print 9 finnzy.jpg',
                title: 'Personalização de Temas - Interface Customizável',
                description: [
                    'Personalização completa de temas e interface do aplicativo.',
                    'Escolha de cores, estilos e layouts conforme preferência do usuário.',
                    'Temas escuro, claro e personalizados para melhor experiência visual.'
                ]
            }
        };
    }

    init() {
        this.bindEvents();
        this.updateScreen();
        console.log('FinzzyDemo inicializado com sucesso!');
    }

    bindEvents() {
        // Botão para abrir o modal
        const demoBtn = document.getElementById('finzzy-demo-btn');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                console.log('Botão demo Finzzy clicado!');
                this.openModal();
            });
        } else {
            console.error('Botão demo Finzzy não encontrado!');
        }

        // Botão para fechar o modal
        const closeBtn = document.getElementById('close-finzzy-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Fechar modal clicando fora
        const modal = document.getElementById('finzzy-demo-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Navegação entre telas
        const navBtns = document.querySelectorAll('.finzzy-demo-nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const screen = parseInt(btn.dataset.screen);
                console.log('Navegando para tela Finzzy:', screen);
                this.goToScreen(screen);
            });
        });

        // Botões anterior/próximo
        const prevBtn = document.getElementById('finzzy-prev-screen');
        const nextBtn = document.getElementById('finzzy-next-screen');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousScreen());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextScreen());
        }

        // Teclas de navegação
        document.addEventListener('keydown', (e) => {
            if (!this.isModalOpen()) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousScreen();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextScreen();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.closeModal();
                    break;
            }
        });
    }

    openModal() {
        const modal = document.getElementById('finzzy-demo-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            this.updateScreen();
            console.log('Modal Finzzy aberto!');
        }
    }

    closeModal() {
        const modal = document.getElementById('finzzy-demo-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            console.log('Modal Finzzy fechado!');
        }
    }

    isModalOpen() {
        const modal = document.getElementById('finzzy-demo-modal');
        return modal && !modal.classList.contains('hidden');
    }

    goToScreen(screenNumber) {
        if (this.screens[screenNumber]) {
            this.currentScreen = screenNumber;
            this.updateScreen();
            console.log('Indo para tela Finzzy:', screenNumber);
        }
    }

    previousScreen() {
        const screenNumbers = Object.keys(this.screens).map(Number).sort((a, b) => a - b);
        const currentIndex = screenNumbers.indexOf(this.currentScreen);
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : screenNumbers.length - 1;
        this.goToScreen(screenNumbers[previousIndex]);
    }

    nextScreen() {
        const screenNumbers = Object.keys(this.screens).map(Number).sort((a, b) => a - b);
        const currentIndex = screenNumbers.indexOf(this.currentScreen);
        const nextIndex = currentIndex < screenNumbers.length - 1 ? currentIndex + 1 : 0;
        this.goToScreen(screenNumbers[nextIndex]);
    }

    updateScreen() {
        const screen = this.screens[this.currentScreen];
        if (!screen) return;

        console.log('Atualizando tela Finzzy:', this.currentScreen, screen);

        // Atualizar imagem
        const image = document.getElementById('finzzy-demo-image');
        if (image) {
            image.src = screen.image;
            image.alt = `Tela ${this.currentScreen} - ${screen.title}`;
            console.log('Imagem Finzzy atualizada:', screen.image);
        }

        // Atualizar título
        const title = document.getElementById('finzzy-screen-title');
        if (title) {
            title.textContent = screen.title;
        }

        // Atualizar descrição
        const description = document.getElementById('finzzy-screen-description');
        if (description) {
            description.innerHTML = screen.description.map(desc => `<p>${desc}</p>`).join('');
        }

        // Atualizar número da tela
        const screenNumber = document.getElementById('finzzy-current-screen-number');
        if (screenNumber) {
            screenNumber.textContent = this.currentScreen;
        }

        // Atualizar navegação
        this.updateNavigation();
    }

    updateNavigation() {
        // Atualizar botões de navegação
        const navBtns = document.querySelectorAll('.finzzy-demo-nav-btn');
        navBtns.forEach(btn => {
            const screen = parseInt(btn.dataset.screen);
            if (screen === this.currentScreen) {
                btn.classList.add('bg-green-600', 'text-white');
                btn.classList.remove('bg-gray-200', 'text-gray-700');
            } else {
                btn.classList.remove('bg-green-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            }
        });

        // Atualizar botões anterior/próximo
        const prevBtn = document.getElementById('finzzy-prev-screen');
        const nextBtn = document.getElementById('finzzy-next-screen');
        
        if (prevBtn) {
            prevBtn.disabled = false;
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando FinzzyDemo...');
    new FinzzyDemo();
});
