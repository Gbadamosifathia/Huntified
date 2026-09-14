document.addEventListener('DOMContentLoaded', () => {

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    const categoryButtons = document.querySelectorAll('.grid-cols-5 button, .grid-cols-2.sm\\:grid-cols-5 button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-slate-900', 'text-white', 'border-slate-900');
                btn.classList.add('bg-slate-50', 'hover:bg-slate-100', 'text-slate-700', 'border-slate-200');
                const icon = btn.querySelector('i');
                if (icon) icon.classList.add('text-slate-400');
            });
            button.classList.remove('bg-slate-50', 'hover:bg-slate-100', 'text-slate-700', 'border-slate-200');
            button.classList.add('bg-slate-900', 'text-white', 'border-slate-900');
            const activeIcon = button.querySelector('i');
            if (activeIcon) activeIcon.classList.remove('text-slate-400');
        });
    });
    const uploadBox = document.querySelector('.border-dashed');
    if (uploadBox) {
        uploadBox.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = 'image/*,.pdf';
            input.onchange = (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    alert(`${files.length} file(s) selected successfully for EXIF coordinate validation & AI parsing.`);
                }
            };
            input.click();
        });
    }
    const aiVerifyBtn = document.querySelector('button.bg-emerald-600');
    if (aiVerifyBtn) {
        aiVerifyBtn.addEventListener('click', () => {
            const originalText = aiVerifyBtn.innerHTML;
            aiVerifyBtn.disabled = true;
            aiVerifyBtn.innerHTML = `<span>Running On-Chain & EXIF Audit...</span>`;
            
            setTimeout(() => {
                aiVerifyBtn.innerHTML = `<span>Verified Successful (96% Integrity)</span>`;
                aiVerifyBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
                aiVerifyBtn.classList.add('bg-slate-900', 'text-white');
                alert('Property audit completed successfully! Title deed and geolocation match verified on registry.');
            }, 1500);
        });
    }
    const saveDraftBtn = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Save Draft'));
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            const originalText = saveDraftBtn.textContent;
            saveDraftBtn.textContent = 'Saved!';
            setTimeout(() => {
                saveDraftBtn.textContent = originalText;
            }, 2000);
        });
    }
});