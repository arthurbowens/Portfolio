document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfólio carregado com sucesso! 🚀');
    
    inicializarPortfolio();
});

function inicializarPortfolio() {
    inicializarBotaoTopo();
    
    inicializarAnimacoesScroll();
    
    inicializarMenuMobile();
    
    inicializarFormularioContato();
    
    inicializarEfeitosHover();
    
    inicializarLazyLoading();
}

function inicializarBotaoTopo() {
    const botaoTopo = document.getElementById('botaoTopo');
    
    if (!botaoTopo) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            botaoTopo.classList.add('ativo');
        } else {
            botaoTopo.classList.remove('ativo');
        }
    });
    
    botaoTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function inicializarAnimacoesScroll() {
    const elementos = document.querySelectorAll('.servico, .projeto, .habilidade');
    
    if (elementos.length === 0) return;
    
    const observador = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementos.forEach(function(elemento) {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observador.observe(elemento);
    });
}

function inicializarMenuMobile() {
    const botaoMobile = document.querySelector('.navegacao__botao-mobile');
    const menu = document.querySelector('.navegacao__menu');
    
    if (!botaoMobile || !menu) return;
    
    botaoMobile.addEventListener('click', function() {
        menu.classList.toggle('ativo');
        botaoMobile.classList.toggle('ativo');
        
        const barras = botaoMobile.querySelectorAll('span');
        barras.forEach(function(barra, index) {
            if (menu.classList.contains('ativo')) {
                if (index === 0) barra.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) barra.style.opacity = '0';
                if (index === 2) barra.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                barra.style.transform = 'none';
                barra.style.opacity = '1';
            }
        });
    });
    
    const links = menu.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('ativo');
            botaoMobile.classList.remove('ativo');
            
            const barras = botaoMobile.querySelectorAll('span');
            barras.forEach(function(barra) {
                barra.style.transform = 'none';
                barra.style.opacity = '1';
            });
        });
    });
    
    document.addEventListener('click', function(evento) {
        if (!botaoMobile.contains(evento.target) && !menu.contains(evento.target)) {
            menu.classList.remove('ativo');
            botaoMobile.classList.remove('ativo');
            
            const barras = botaoMobile.querySelectorAll('span');
            barras.forEach(function(barra) {
                barra.style.transform = 'none';
                barra.style.opacity = '1';
            });
        }
    });
}

function inicializarFormularioContato() {
    const formulario = document.getElementById('formularioContato');
    
    if (!formulario) return;
    
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        if (validarFormulario(formulario)) {
            enviarFormulario(formulario);
        }
    });
    
    const campos = formulario.querySelectorAll('input, textarea');
    campos.forEach(function(campo) {
        campo.addEventListener('blur', function() {
            validarCampo(campo);
        });
        
        campo.addEventListener('input', function() {
            limparErroCampo(campo);
        });
    });
}

function validarCampo(campo) {
    const valor = campo.value.trim();
    let valido = true;
    let mensagem = '';
    
    limparErroCampo(campo);
    
    switch (campo.type) {
        case 'email':
            if (!valor) {
                mensagem = 'E-mail é obrigatório';
                valido = false;
            } else if (!validarEmail(valor)) {
                mensagem = 'E-mail inválido';
                valido = false;
            }
            break;
            
        case 'text':
            if (!valor) {
                mensagem = campo.placeholder || 'Campo é obrigatório';
                valido = false;
            }
            break;
            
        default:
            if (!valor) {
                mensagem = 'Campo é obrigatório';
                valido = false;
            }
    }
    
    if (!valido) {
        mostrarErroCampo(campo, mensagem);
    }
    
    return valido;
}

function validarFormulario(formulario) {
    const campos = formulario.querySelectorAll('input, textarea');
    let valido = true;
    
    campos.forEach(function(campo) {
        if (!validarCampo(campo)) {
            valido = false;
        }
    });
    
    return valido;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarErroCampo(campo, mensagem) {
    campo.classList.add('erro');
    
    let erroElemento = campo.parentNode.querySelector('.erro-mensagem');
    if (!erroElemento) {
        erroElemento = document.createElement('span');
        erroElemento.className = 'erro-mensagem';
        erroElemento.style.color = 'var(--cor-erro)';
        erroElemento.style.fontSize = 'var(--texto-sm)';
        erroElemento.style.marginTop = 'var(--espaco-xs)';
        campo.parentNode.appendChild(erroElemento);
    }
    
    erroElemento.textContent = mensagem;
}

function limparErroCampo(campo) {
    campo.classList.remove('erro');
    
    const erroElemento = campo.parentNode.querySelector('.erro-mensagem');
    if (erroElemento) {
        erroElemento.remove();
    }
}

function enviarFormulario(formulario) {
    const botaoEnviar = formulario.querySelector('button[type="submit"]');
    const textoOriginal = botaoEnviar.textContent;
    
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = 'Enviando...';
    botaoEnviar.style.opacity = '0.7';
    
    setTimeout(function() {
        mostrarMensagem('Mensagem enviada com sucesso!', 'sucesso');
        formulario.reset();
        
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = textoOriginal;
        botaoEnviar.style.opacity = '1';
    }, 2000);
}

function mostrarMensagem(texto, tipo) {
    const mensagensExistentes = document.querySelectorAll('.mensagem-feedback');
    mensagensExistentes.forEach(function(msg) {
        msg.remove();
    });
    
    const mensagem = document.createElement('div');
    mensagem.className = `mensagem-feedback mensagem--${tipo}`;
    mensagem.textContent = texto;
    
    mensagem.style.position = 'fixed';
    mensagem.style.top = '20px';
    mensagem.style.right = '20px';
    mensagem.style.padding = 'var(--espaco-md) var(--espaco-lg)';
    mensagem.style.borderRadius = 'var(--raio-lg)';
    mensagem.style.color = 'var(--cor-branco)';
    mensagem.style.fontWeight = 'var(--peso-medio)';
    mensagem.style.zIndex = 'var(--z-modal)';
    mensagem.style.transform = 'translateX(100%)';
    mensagem.style.transition = 'transform var(--transicao-normal)';
    
    if (tipo === 'sucesso') {
        mensagem.style.backgroundColor = 'var(--cor-sucesso)';
    } else if (tipo === 'erro') {
        mensagem.style.backgroundColor = 'var(--cor-erro)';
    } else {
        mensagem.style.backgroundColor = 'var(--cor-info)';
    }
    
    document.body.appendChild(mensagem);
    
    setTimeout(function() {
        mensagem.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(function() {
        mensagem.style.transform = 'translateX(100%)';
        setTimeout(function() {
            if (mensagem.parentNode) {
                mensagem.remove();
            }
        }, 300);
    }, 5000);
}

function inicializarEfeitosHover() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    const cards = document.querySelectorAll('.servico, .projeto');
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(evento) {
            const rect = card.getBoundingClientRect();
            const x = evento.clientX - rect.left;
            const y = evento.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

function inicializarLazyLoading() {
    const imagens = document.querySelectorAll('img[data-src]');
    
    if (imagens.length === 0) return;
    
    const observador = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observador.unobserve(img);
            }
        });
    });
    
    imagens.forEach(function(img) {
        img.classList.add('lazy');
        observador.observe(img);
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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

window.Portfolio = {
    mostrarMensagem,
    validarEmail,
    debounce,
    throttle
};