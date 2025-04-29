// Menu Mobile
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Validação do formulário de contato
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const message = document.getElementById('message').value;
        
        let isValid = true;
        let errorMessage = '';
        
        if (!name.trim()) {
            isValid = false;
            errorMessage += 'Por favor, preencha seu nome.\n';
        }
        
        if (!email.trim() || !isValidEmail(email)) {
            isValid = false;
            errorMessage += 'Por favor, insira um email válido.\n';
        }
        
        if (!company.trim()) {
            isValid = false;
            errorMessage += 'Por favor, preencha o nome da empresa.\n';
        }
        
        if (!message.trim()) {
            isValid = false;
            errorMessage += 'Por favor, escreva sua mensagem.\n';
        }
        
        if (isValid) {
            // Aqui você pode adicionar o código para enviar o formulário
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        } else {
            alert(errorMessage);
        }
    });
}

// Função auxiliar para validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Animação de elementos ao scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .benefit-item, .pricing-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Adicionar evento de scroll
window.addEventListener('scroll', animateOnScroll);

// Inicializar animações
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Adicionar classe de carregamento para elementos
    document.querySelectorAll('.feature-card, .benefit-item, .pricing-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    });
});

// Otimização de performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Código que precisa ser executado durante o scroll
    });
});

// Carregamento lazy de imagens
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Navegador suporta lazy loading nativo
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que não suportam lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}); 