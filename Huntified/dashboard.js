document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    const filterButtons = document.querySelectorAll('.overflow-hidden .flex.items-center.gap-2.text-xs.font-semibold button');
    const tableRows = document.querySelectorAll('tbody tr');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-slate-900', 'text-white');
                btn.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
            });
            button.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
            button.classList.add('bg-slate-900', 'text-white');

            const filterType = button.textContent.trim().toLowerCase();

            // Filter rows based on clicked tab
            tableRows.forEach(row => {
                const statusBadge = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
                
                if (filterType.includes('all')) {
                    row.style.display = '';
                } else if (filterType.includes('verified') && statusbadgeIncludes(statusBadge, 'verified')) {
                    row.style.display = '';
                } else if (filterType.includes('action required') && (statusbadgeIncludes(statusBadge, 'pending') || statusbadgeIncludes(statusBadge, 'resubmit'))) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    function statusbadgeIncludes(text, keyword) {
        return text.includes(keyword);
    }r
    const addPropertyBtn = document.querySelector('button');
    const headerButtons = document.querySelectorAll('header button');
    headerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const icon = btn.querySelector('i');
            if (icon && icon.getAttribute('data-lucide') === 'bell') {
                alert('No new urgent escrow alerts. All 12 properties are up to date.');
            }
        });
    });
});