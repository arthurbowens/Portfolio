document.addEventListener('DOMContentLoaded', function() {
    inicializarFormulario();
});

function inicializarFormulario() {
    const formulario = document.getElementById('formularioContato');
    
    if (!formulario) return;
    
    inicializarValidacaoTempoReal();
    inicializarAutoResize();
    inicializarSalvamentoLocal();
    inicializarEnvioFormulario();
    inicializarEfeitosVisuais();
}

function inicializarValidacaoTempoReal() {
    const campos = document.querySelectorAll('.formulario__input, .formulario__textarea');
    
    campos.forEach(function(campo) {
        campo.addEventListener('blur', function() {
            validarCampoTempoReal(this);
        });
        
        campo.addEventListener('input', function() {
            limparErroCampo(this);
            validarCampoCompleto(this);
        });
        
        campo.addEventListener('keypress', function(evento) {
            if (evento.key === 'Enter') {
                evento.preventDefault();
                const proximoCampo = this.parentNode.nextElementSibling?.querySelector('input, textarea');
                if (proximoCampo) {
                    proximoCampo.focus();
                }
            }
        });
    });
}

function validarCampoTempoReal(campo) {
    const valor = campo.value.trim();
    let valido = true;
    let mensagem = '';
    
    limparErroCampo(campo);
    
    switch (campo.type) {
        case 'email':
            if (!valor) {
                mensagem = 'E-mail é obrigatório';
                valido = false;
            } else if (!validarFormatoEmail(valor)) {
                mensagem = 'Formato de e-mail inválido';
                valido = false;
            }
            break;
            
        case 'text':
            if (campo.id === 'nome') {
                if (!valor) {
                    mensagem = 'Nome é obrigatório';
                    valido = false;
                } else if (valor.length < 2) {
                    mensagem = 'Nome deve ter pelo menos 2 caracteres';
                    valido = false;
                }
            } else if (campo.id === 'assunto') {
                if (!valor) {
                    mensagem = 'Assunto é obrigatório';
                    valido = false;
                } else if (valor.length < 5) {
                    mensagem = 'Assunto deve ter pelo menos 5 caracteres';
                    valido = false;
                }
            }
            break;
            
        default:
            if (!valor) {
                mensagem = 'Campo é obrigatório';
                valido = false;
            } else if (valor.length < 10) {
                mensagem = 'Mensagem deve ter pelo menos 10 caracteres';
                valido = false;
            }
    }
    
    if (!valido) {
        mostrarErroCampo(campo, mensagem);
        campo.classList.add('campo--erro');
    } else {
        campo.classList.add('campo--valido');
        mostrarSucessoCampo(campo);
    }
    
    return valido;
}

function validarFormatoEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCampoCompleto(campo) {
    const valor = campo.value.trim();
    
    if (valor.length > 0) {
        if (validarCampoTempoReal(campo)) {
            campo.classList.add('campo--preenchido');
        }
    } else {
        campo.classList.remove('campo--preenchido', 'campo--valido', 'campo--erro');
    }
}

function mostrarErroCampo(campo, mensagem) {
    let erroElemento = campo.parentNode.querySelector('.erro-mensagem');
    if (!erroElemento) {
        erroElemento = document.createElement('span');
        erroElemento.className = 'erro-mensagem';
        erroElemento.style.cssText = `
            color: var(--cor-erro);
            font-size: var(--texto-sm);
            margin-top: var(--espaco-xs);
            display: block;
            animation: slideIn 0.3s ease;
        `;
        campo.parentNode.appendChild(erroElemento);
    }
    
    erroElemento.textContent = mensagem;
    
    if (!campo.parentNode.querySelector('.erro-icone')) {
        const iconeErro = document.createElement('i');
        iconeErro.className = 'fas fa-exclamation-circle erro-icone';
        iconeErro.style.cssText = `
            position: absolute;
            right: var(--espaco-md);
            top: 50%;
            transform: translateY(-50%);
            color: var(--cor-erro);
            font-size: var(--texto-lg);
        `;
        campo.parentNode.style.position = 'relative';
        campo.parentNode.appendChild(iconeErro);
    }
}

function mostrarSucessoCampo(campo) {
    const erroElemento = campo.parentNode.querySelector('.erro-mensagem');
    if (erroElemento) {
        erroElemento.remove();
    }
    
    if (!campo.parentNode.querySelector('.sucesso-icone')) {
        const iconeSucesso = document.createElement('i');
        iconeSucesso.className = 'fas fa-check-circle sucesso-icone';
        iconeSucesso.style.cssText = `
            position: absolute;
            right: var(--espaco-md);
            top: 50%;
            transform: translateY(-50%);
            color: var(--cor-sucesso);
            font-size: var(--texto-lg);
            animation: bounceIn 0.5s ease;
        `;
        campo.parentNode.style.position = 'relative';
        campo.parentNode.appendChild(iconeSucesso);
    }
}

function limparErroCampo(campo) {
    campo.classList.remove('campo--erro');
    
    const erroElemento = campo.parentNode.querySelector('.erro-mensagem');
    if (erroElemento) {
        erroElemento.remove();
    }
    
    const erroIcone = campo.parentNode.querySelector('.erro-icone');
    if (erroIcone) {
        erroIcone.remove();
    }
    
    const sucessoIcone = campo.parentNode.querySelector('.sucesso-icone');
    if (sucessoIcone) {
        sucessoIcone.remove();
    }
}

function inicializarAutoResize() {
    const textareas = document.querySelectorAll('.formulario__textarea');
    
    textareas.forEach(function(textarea) {
        ajustarAlturaTextarea(textarea);
        
        textarea.addEventListener('input', function() {
            ajustarAlturaTextarea(this);
        });
        
        window.addEventListener('resize', function() {
            ajustarAlturaTextarea(textarea);
        });
    });
}

function ajustarAlturaTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function inicializarSalvamentoLocal() {
    const campos = document.querySelectorAll('.formulario__input, .formulario__textarea');
    
    campos.forEach(function(campo) {
        const valorSalvo = localStorage.getItem(`formulario_${campo.id}`);
        if (valorSalvo) {
            campo.value = valorSalvo;
            validarCampoCompleto(campo);
        }
    });
    
    campos.forEach(function(campo) {
        campo.addEventListener('input', function() {
            localStorage.setItem(`formulario_${this.id}`, this.value);
        });
    });
}

function inicializarEnvioFormulario() {
    const formulario = document.getElementById('formularioContato');
    
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        if (validarFormularioCompleto()) {
            enviarFormularioCompleto();
        }
    });
}

function validarFormularioCompleto() {
    const campos = document.querySelectorAll('.formulario__input, .formulario__textarea');
    let valido = true;
    
    campos.forEach(function(campo) {
        if (!validarCampoTempoReal(campo)) {
            valido = false;
        }
    });
    
    return valido;
}

function enviarFormularioCompleto() {
    const formulario = document.getElementById('formularioContato');
    const botaoEnviar = formulario.querySelector('button[type="submit"]');
    const textoOriginal = botaoEnviar.textContent;
    
    botaoEnviar.disabled = true;
    botaoEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    botaoEnviar.style.opacity = '0.7';
    
    const dados = {
        nome: formulario.querySelector('#nome').value.trim(),
        email: formulario.querySelector('#email').value.trim(),
        assunto: formulario.querySelector('#assunto').value.trim(),
        mensagem: formulario.querySelector('#mensagem').value.trim(),
        timestamp: new Date().toISOString()
    };
    
    setTimeout(function() {
        mostrarMensagemSucesso('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        
        formulario.reset();
        limparLocalStorage();
        
        botaoEnviar.disabled = false;
        botaoEnviar.innerHTML = textoOriginal;
        botaoEnviar.style.opacity = '1';
        
        const campos = formulario.querySelectorAll('.formulario__input, .formulario__textarea');
        campos.forEach(function(campo) {
            campo.classList.remove('campo--valido', 'campo--preenchido');
            limparErroCampo(campo);
        });
        
        console.log('Dados do formulário:', dados);
        
    }, 2000);
}

function mostrarMensagemSucesso(texto) {
    const mensagensExistentes = document.querySelectorAll('.mensagem-sucesso');
    mensagensExistentes.forEach(function(msg) {
        msg.remove();
    });
    
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-sucesso';
    mensagem.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${texto}</span>
    `;
    
    mensagem.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--cor-sucesso);
        color: var(--cor-branco);
        padding: var(--espaco-md) var(--espaco-lg);
        border-radius: var(--raio-lg);
        box-shadow: var(--sombra-lg);
        z-index: var(--z-modal);
        display: flex;
        align-items: center;
        gap: var(--espaco-sm);
        font-weight: var(--peso-medio);
        transform: translateX(100%);
        transition: transform var(--transicao-normal);
        max-width: 400px;
    `;
    
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
    }, 8000);
}

function limparLocalStorage() {
    const campos = ['nome', 'email', 'assunto', 'mensagem'];
    campos.forEach(function(campo) {
        localStorage.removeItem(`formulario_${campo}`);
    });
}

function inicializarEfeitosVisuais() {
    const campos = document.querySelectorAll('.formulario__input, .formulario__textarea');
    
    campos.forEach(function(campo) {
        campo.addEventListener('focus', function() {
            this.parentNode.classList.add('formulario__grupo--focado');
        });
        
        campo.addEventListener('blur', function() {
            this.parentNode.classList.remove('formulario__grupo--focado');
        });
        
        campo.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.parentNode.classList.add('formulario__grupo--preenchido');
            } else {
                this.parentNode.classList.remove('formulario__grupo--preenchido');
            }
        });
        
        campo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--sombra-md)';
        });
        
        campo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function exportarDadosFormulario() {
    const campos = document.querySelectorAll('.formulario__input, .formulario__textarea');
    const dados = {};
    
    campos.forEach(function(campo) {
        dados[campo.id] = campo.value;
    });
    
    console.log('Dados do formulário:', dados);
    return dados;
}

function limparFormulario() {
    const formulario = document.getElementById('formularioContato');
    if (formulario) {
        formulario.reset();
        limparLocalStorage();
        
        const campos = formulario.querySelectorAll('.formulario__input, .formulario__textarea');
        campos.forEach(function(campo) {
            campo.classList.remove('campo--valido', 'campo--preenchido', 'campo--erro');
            limparErroCampo(campo);
        });
    }
}

const estilosFormulario = document.createElement('style');
estilosFormulario.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: translateY(-50%) scale(0.3);
            opacity: 0;
        }
        50% {
            transform: translateY(-50%) scale(1.05);
        }
        70% {
            transform: translateY(-50%) scale(0.9);
        }
        100% {
            transform: translateY(-50%) scale(1);
            opacity: 1;
        }
    }
    
    .formulario__grupo--focado .formulario__input,
    .formulario__grupo--focado .formulario__textarea {
        border-color: var(--cor-primaria);
        box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
    }
    
    .formulario__grupo--preenchido .formulario__label {
        color: var(--cor-primaria);
        font-weight: var(--peso-semibold);
    }
    
    .campo--erro {
        border-color: var(--cor-erro) !important;
        box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1) !important;
    }
    
    .campo--valido {
        border-color: var(--cor-sucesso) !important;
        box-shadow: 0 0 0 3px rgb(16 185 129 / 0.1) !important;
    }
    
    .campo--preenchido {
        background-color: var(--cor-cinza-50);
    }
`;

document.head.appendChild(estilosFormulario);

window.Formulario = {
    exportarDados: exportarDadosFormulario,
    limpar: limparFormulario,
    validar: validarFormularioCompleto
};