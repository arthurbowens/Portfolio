document.addEventListener('DOMContentLoaded', function() {
    inicializarAnimacoes();
});

function inicializarAnimacoes() {
    inicializarAnimacoesEntrada();
    inicializarAnimacoesScroll();
    inicializarAnimacoesHover();
    inicializarAnimacoesTexto();
    inicializarAnimacoesParallax();
    inicializarAnimacoesLoading();
}


function inicializarAnimacoesEntrada() {
    const elementos = document.querySelectorAll('.hero__titulo, .hero__subtitulo, .hero__acoes, .hero__avatar');
    
    elementos.forEach(function(elemento, index) {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(function() {
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
}


function inicializarAnimacoesScroll() {
    const elementos = document.querySelectorAll('.servico, .projeto, .habilidade, .secao__cabecalho');
    
    if (elementos.length === 0) return;
    
    const observador = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const elemento = entry.target;
                
                elemento.classList.add('animado');
                
                const elementosFilhos = elemento.querySelectorAll('.servico__icone, .projeto__imagem, .habilidade i');
                elementosFilhos.forEach(function(filho, index) {
                    setTimeout(function() {
                        filho.style.animation = 'pulse 0.6s ease';
                    }, index * 100);
                });
                
                observador.unobserve(elemento);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementos.forEach(function(elemento) {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(40px)';
        elemento.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observador.observe(elemento);
    });
}


function inicializarAnimacoesHover() {
    const cards = document.querySelectorAll('.servico, .projeto, .habilidade');
    
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = 'var(--sombra-xl)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--sombra-sm)';
        });
    });
    
    const icones = document.querySelectorAll('.servico__icone i, .habilidade i');
    
    icones.forEach(function(icone) {
        icone.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(360deg) scale(1.1)';
        });
        
        icone.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
    
    const botoes = document.querySelectorAll('.botao');
    
    botoes.forEach(function(botao) {
        botao.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, var(--cor-primaria), var(--cor-accent))';
            this.style.backgroundSize = '200% 200%';
            this.style.animation = 'gradientShift 2s ease infinite';
        });
        
        botao.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.backgroundSize = '';
            this.style.animation = '';
        });
    });
}


function inicializarAnimacoesTexto() {
    const titulo = document.querySelector('.hero__titulo');
    if (titulo) {
        const texto = titulo.textContent;
        titulo.textContent = '';
        
        let index = 0;
        const velocidade = 100; 
        
        function digitarTexto() {
            if (index < texto.length) {
                titulo.textContent += texto.charAt(index);
                index++;
                setTimeout(digitarTexto, velocidade);
            }
        }
        
        setTimeout(digitarTexto, 500);
    }
    
    const paragrafos = document.querySelectorAll('.sobre__texto p, .servico__descricao, .projeto__descricao');
    
    paragrafos.forEach(function(paragrafo, index) {
        paragrafo.style.opacity = '0';
        paragrafo.style.transform = 'translateX(-20px)';
        paragrafo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(function() {
            paragrafo.style.opacity = '1';
            paragrafo.style.transform = 'translateX(0)';
        }, 1000 + (index * 200));
    });
}

function inicializarAnimacoesParallax() {
    const elementosParallax = document.querySelectorAll('.hero, .sobre, .servicos, .projetos');
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        
        elementosParallax.forEach(function(elemento, index) {
            const velocidade = 0.5 + (index * 0.1);
            const yPos = -(scrolled * velocidade);
            elemento.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}


function inicializarAnimacoesLoading() {
    const projetos = document.querySelectorAll('.projeto__imagem');
    
    projetos.forEach(function(projeto) {
        const loading = document.createElement('div');
        loading.className = 'loading-projeto';
        loading.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Carregando projeto...</p>
        `;
        
        loading.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--cor-cinza-100);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--cor-cinza-600);
            font-size: var(--texto-sm);
        `;
        
        const spinner = loading.querySelector('.loading-spinner');
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 3px solid var(--cor-cinza-300);
            border-top: 3px solid var(--cor-primaria);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: var(--espaco-sm);
        `;
        
        projeto.style.position = 'relative';
        projeto.appendChild(loading);
        
        const imagem = projeto.querySelector('img');
        if (imagem) {
            imagem.addEventListener('load', function() {
                loading.style.opacity = '0';
                setTimeout(function() {
                    loading.remove();
                }, 300);
            });
        }
    });
}


function inicializarAnimacoesContador() {
    const contadores = document.querySelectorAll('[data-contador]');
    
    if (contadores.length === 0) return;
    
    const observador = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const contador = entry.target;
                const valorFinal = parseInt(contador.dataset.contador);
                const duracao = 2000; 
                const incremento = valorFinal / (duracao / 16); // 60fps
                let valorAtual = 0;
                
                const timer = setInterval(function() {
                    valorAtual += incremento;
                    if (valorAtual >= valorFinal) {
                        valorAtual = valorFinal;
                        clearInterval(timer);
                    }
                    contador.textContent = Math.floor(valorAtual);
                }, 16);
                
                observador.unobserve(contador);
            }
        });
    }, {
        threshold: 0.5
    });
    
    contadores.forEach(function(contador) {
        observador.observe(contador);
    });
}


function inicializarAnimacoesParticulas() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particulas-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particulas = [];
    
    const config = {
        quantidade: 50,
        velocidade: 0.5,
        tamanho: 2,
        cor: 'var(--cor-primaria)'
    };
    
    function inicializarParticulas() {
        particulas = [];
        for (let i = 0; i < config.quantidade; i++) {
            particulas.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * config.velocidade,
                vy: (Math.random() - 0.5) * config.velocidade,
                tamanho: Math.random() * config.tamanho + 1
            });
        }
    }
    
    function atualizarParticulas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particulas.forEach(function(particula) {
            particula.x += particula.vx;
            particula.y += particula.vy;
            
            if (particula.x < 0 || particula.x > canvas.width) particula.vx *= -1;
            if (particula.y < 0 || particula.y > canvas.height) particula.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particula.x, particula.y, particula.tamanho, 0, Math.PI * 2);
            ctx.fillStyle = config.cor;
            ctx.fill();
        });
        
        requestAnimationFrame(atualizarParticulas);
    }
    
    function redimensionarCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    redimensionarCanvas();
    inicializarParticulas();
    atualizarParticulas();
    
    window.addEventListener('resize', redimensionarCanvas);
}

function inicializarAnimacoesCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-personalizado';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--cor-primaria);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(evento) {
        cursor.style.left = evento.clientX - 10 + 'px';
        cursor.style.top = evento.clientY - 10 + 'px';
    });
    
    const elementosInterativos = document.querySelectorAll('a, button, .servico, .projeto');
    
    elementosInterativos.forEach(function(elemento) {
        elemento.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'var(--cor-accent)';
        });
        
        elemento.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--cor-primaria)';
        });
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
}


function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const estilosAnimacoes = document.createElement('style');
estilosAnimacoes.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .animado {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .loading-projeto {
        transition: opacity 0.3s ease;
    }
    
    .cursor-personalizado {
        transition: all 0.1s ease;
    }
`;

document.head.appendChild(estilosAnimacoes);

