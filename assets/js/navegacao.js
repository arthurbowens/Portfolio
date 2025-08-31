document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacao();
});

function inicializarNavegacao() {
    inicializarScrollSuave();
    inicializarNavegacaoAtiva();
    inicializarNavegacaoSticky();
    inicializarScrollProgress();
}

function inicializarScrollSuave() {
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    
    linksInternos.forEach(function(link) {
        link.addEventListener('click', function(evento) {
            evento.preventDefault();
            
            const destino = this.getAttribute('href');
            const elementoDestino = document.querySelector(destino);
            
            if (elementoDestino) {
                const offsetTop = elementoDestino.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                if (history.pushState) {
                    history.pushState(null, null, destino);
                }
            }
        });
    });
}

function inicializarNavegacaoAtiva() {
    const secoes = document.querySelectorAll('section[id]');
    const linksNavegacao = document.querySelectorAll('.navegacao__link');
    
    if (secoes.length === 0 || linksNavegacao.length === 0) return;
    
    const observador = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const idSecao = entry.target.getAttribute('id');
                atualizarNavegacaoAtiva(idSecao);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });
    
    secoes.forEach(function(secao) {
        observador.observe(secao);
    });
}

function atualizarNavegacaoAtiva(idSecao) {
    const linksNavegacao = document.querySelectorAll('.navegacao__link');
    
    linksNavegacao.forEach(function(link) {
        link.classList.remove('ativo');
        
        if (link.getAttribute('href') === `#${idSecao}`) {
            link.classList.add('ativo');
        }
    });
}

function inicializarNavegacaoSticky() {
    const navegacao = document.querySelector('.navegacao');
    
    if (!navegacao) return;
    
    let ultimoScroll = 0;
    const threshold = 100;
    
    window.addEventListener('scroll', throttle(function() {
        const scrollAtual = window.pageYOffset;
        
        if (scrollAtual > threshold) {
            navegacao.classList.add('navegacao--scrolled');
        } else {
            navegacao.classList.remove('navegacao--scrolled');
        }
        
        if (scrollAtual > ultimoScroll && scrollAtual > 200) {
            navegacao.style.transform = 'translateY(-100%)';
        } else {
            navegacao.style.transform = 'translateY(0)';
        }
        
        ultimoScroll = scrollAtual;
    }, 100));
}

function inicializarScrollProgress() {
    const barraProgresso = document.createElement('div');
    barraProgresso.className = 'barra-progresso';
    barraProgresso.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--cor-primaria), var(--cor-accent));
        z-index: var(--z-fixed);
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(barraProgresso);
    
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progresso = (scrollTop / scrollHeight) * 100;
        
        barraProgresso.style.width = progresso + '%';
    }, 16));
}

function inicializarNavegacaoTeclado() {
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'ArrowUp' || evento.key === 'ArrowLeft') {
            evento.preventDefault();
            navegarSecao('anterior');
        } else if (evento.key === 'ArrowDown' || evento.key === 'ArrowRight') {
            evento.preventDefault();
            navegarSecao('proxima');
        }
        
        if (evento.key >= '1' && evento.key <= '5') {
            evento.preventDefault();
            const numero = parseInt(evento.key);
            navegarParaSecao(numero);
        }
        
        if (evento.key === 'Home') {
            evento.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        if (evento.key === 'End') {
            evento.preventDefault();
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

function navegarSecao(direcao) {
    const secoes = Array.from(document.querySelectorAll('section[id]'));
    const scrollAtual = window.pageYOffset;
    
    let secaoAtual = 0;
    
    secoes.forEach(function(secao, index) {
        const offsetTop = secao.offsetTop - 100;
        if (scrollAtual >= offsetTop) {
            secaoAtual = index;
        }
    });
    
    let proximaSecao;
    
    if (direcao === 'anterior') {
        proximaSecao = secoes[Math.max(0, secaoAtual - 1)];
    } else {
        proximaSecao = secoes[Math.min(secoes.length - 1, secaoAtual + 1)];
    }
    
    if (proximaSecao) {
        const offsetTop = proximaSecao.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function navegarParaSecao(numero) {
    const secoes = document.querySelectorAll('section[id]');
    const secao = secoes[numero - 1];
    
    if (secao) {
        const offsetTop = secao.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function inicializarNavegacaoGestos() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', function(evento) {
        startX = evento.touches[0].clientX;
        startY = evento.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(evento) {
        endX = evento.changedTouches[0].clientX;
        endY = evento.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                navegarSecao('proxima');
            } else if (diffX < -50) {
                navegarSecao('anterior');
            }
        } else {
            if (diffY > 50) {
                navegarSecao('anterior');
            } else if (diffY < -50) {
                navegarSecao('proxima');
            }
        }
    });
}

function inicializarScrollInfinito() {
    const secoes = document.querySelectorAll('section[id]');
    let secaoAtual = 0;
    
    window.addEventListener('wheel', throttle(function(evento) {
        if (evento.deltaY > 0) {
            secaoAtual = Math.min(secaoAtual + 1, secoes.length - 1);
        } else {
            secaoAtual = Math.max(secaoAtual - 1, 0);
        }
        
        const secao = secoes[secaoAtual];
        if (secao) {
            const offsetTop = secao.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        evento.preventDefault();
    }, 500));
}

function inicializarNavegacaoHash() {
    if (window.location.hash) {
        const elemento = document.querySelector(window.location.hash);
        if (elemento) {
            setTimeout(function() {
                const offsetTop = elemento.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    window.addEventListener('scroll', throttle(function() {
        const secoes = document.querySelectorAll('section[id]');
        let secaoAtual = '';
        
        secoes.forEach(function(secao) {
            const rect = secao.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                secaoAtual = secao.getAttribute('id');
            }
        });
        
        if (secaoAtual && window.location.hash !== `#${secaoAtual}`) {
            if (history.pushState) {
                history.pushState(null, null, `#${secaoAtual}`);
            }
        }
    }, 100));
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