// Sistema de Demonstração do Projeto Validata
class ValidataDemo {
    constructor() {
        this.currentScreen = 1;
        this.totalScreens = 9;
        this.screens = this.initializeScreens();
        this.init();
    }

    initializeScreens() {
        return {
            1: {
                image: 'assets/images/validata-demo/print 1 validata.png',
                title: 'Tela de Login',
                description: [
                    'Sistema de autenticação seguro com validação de credenciais.',
                    'Controle de acesso e sessões protegidas.',
                    'Interface limpa e intuitiva para login.'
                ]
            },
            2: {
                image: 'assets/images/validata-demo/print 2 validata.png',
                title: 'Dashboard Principal',
                description: [
                    'Controle de estoque e validades dos produtos.',
                    'Alertas de produtos próximos a vencer e vencidos.',
                    'Métricas de produtos que vencem hoje.'
                ]
            },
            3: {
                image: 'assets/images/validata-demo/print 3 validata.png',
                title: 'Filtragem de Produtos',
                description: [
                    'Sistema de filtros para busca de produtos.',
                    'Filtros por categoria e fornecedor.',
                    'Busca avançada e resultados organizados.'
            ]
            },
            4: {
                image: 'assets/images/validata-demo/print 4 validata.png',
                title: 'Listagem de Corredores e Categorias',
                description: [
                    'Visualização de corredores do estabelecimento.',
                    'Organização por categorias de produtos.',
                    'Estrutura hierárquica de localização.'
                ]
            },
            5: {
                image: 'assets/images/validata-demo/print 5 validata.png',
                title: 'Cadastro de Corredores',
                description: [
                    'Cadastro e edição de corredores do estabelecimento.',
                    'Possibilidade de salvar imagem em base64.',
                    'Organização e estrutura dos corredores.'
                ]
            },
            6: {
                image: 'assets/images/validata-demo/print 6 validata.png',
                title: 'Gerenciar Produtos',
                description: [
                    'Sistema completo de gestão de produtos do estoque.',
                    'Funcionalidade de entrada no estoque com controle de quantidade.',
                    'Visualização de produtos por corredor ou categoria específica.'
                ]
            },
            7: {
                image: 'assets/images/validata-demo/print 7 validata.png',
                title: 'Gerenciar Alertas',
                description: [
                    'Sistema completo de gestão de alertas do sistema.',
                    'Funcionalidade de busca e filtragem de alertas.',
                    'Visualização organizada e controle de notificações.'
                ]
            },
            8: {
                image: 'assets/images/validata-demo/print 8 validata.png',
                title: 'Gestão de Fornecedores',
                description: [
                    'Listagem completa de fornecedores cadastrados.',
                    'Sistema de filtros para busca e organização.',
                    'Funcionalidades de edição e exclusão de fornecedores.'
                ]
            },
            9: {
                image: 'assets/images/validata-demo/print 9.png',
                title: 'Editar Informações Pessoais',
                description: [
                    'Atualização de dados pessoais do usuário.',
                    'Modificação de informações de perfil.',
                    'Configurações de conta e preferências pessoais.'
                ]
            }
        };
    }

    init() {
        this.bindEvents();
        this.updateScreen();
        console.log('ValidataDemo inicializado com sucesso!');
    }

    bindEvents() {
        // Botão para abrir o modal
        const demoBtn = document.getElementById('validata-demo-btn');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                console.log('Botão demo clicado!');
                this.openModal();
            });
        } else {
            console.error('Botão demo não encontrado!');
        }

        // Botão para fechar o modal
        const closeBtn = document.getElementById('close-validata-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Fechar modal clicando fora
        const modal = document.getElementById('validata-demo-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Navegação entre telas
        const navBtns = document.querySelectorAll('.demo-nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const screen = parseInt(btn.dataset.screen);
                console.log('Navegando para tela:', screen);
                this.goToScreen(screen);
            });
        });

        // Botões anterior/próximo
        const prevBtn = document.getElementById('prev-screen');
        const nextBtn = document.getElementById('next-screen');
        
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
        const modal = document.getElementById('validata-demo-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            this.updateScreen();
            console.log('Modal aberto!');
        }
    }

    closeModal() {
        const modal = document.getElementById('validata-demo-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            console.log('Modal fechado!');
        }
    }

    isModalOpen() {
        const modal = document.getElementById('validata-demo-modal');
        return modal && !modal.classList.contains('hidden');
    }

    goToScreen(screenNumber) {
        if (this.screens[screenNumber]) {
            this.currentScreen = screenNumber;
            this.updateScreen();
            console.log('Indo para tela:', screenNumber);
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

        console.log('Atualizando tela:', this.currentScreen, screen);

        // Atualizar imagem
        const image = document.getElementById('demo-image');
        if (image) {
            image.src = screen.image;
            image.alt = `Tela ${this.currentScreen} - ${screen.title}`;
            console.log('Imagem atualizada:', screen.image);
        }

        // Atualizar título
        const title = document.getElementById('screen-title');
        if (title) {
            title.textContent = screen.title;
        }

        // Atualizar descrição
        const description = document.getElementById('screen-description');
        if (description) {
            description.innerHTML = screen.description.map(desc => `<p>${desc}</p>`).join('');
        }

        // Atualizar número da tela
        const screenNumber = document.getElementById('current-screen-number');
        if (screenNumber) {
            screenNumber.textContent = this.currentScreen;
        }

        // Atualizar navegação
        this.updateNavigation();
    }

    updateNavigation() {
        // Atualizar botões de navegação
        const navBtns = document.querySelectorAll('.demo-nav-btn');
        navBtns.forEach(btn => {
            const screen = parseInt(btn.dataset.screen);
            if (screen === this.currentScreen) {
                btn.classList.add('bg-blue-600', 'text-white');
                btn.classList.remove('bg-gray-200', 'text-gray-700');
            } else {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            }
        });

        // Atualizar botões anterior/próximo
        const prevBtn = document.getElementById('prev-screen');
        const nextBtn = document.getElementById('next-screen');
        
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
    console.log('DOM carregado, inicializando ValidataDemo...');
    new ValidataDemo();
});
