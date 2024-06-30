const accordion = new Accordion('.section4__main', {
    // collapse: false,
    openOnInit: [0],
    // beforeOpen: (e) => {
    //     console.log('beforeOpen', e)
    // },
    // beforeClose: (e) => {
    //     console.log('beforeClose', e)
    // },
})

const section3Tab = TabHandler({
    appElement: document.querySelector('.section3'),
    activatd: '#section3-tab1',
    prevElement: document.querySelector('.section3 .tabs__prev-btn'),
    nextElement: document.querySelector('.section3 .tabs__next-btn'),
});

const section4Tab = TabHandler({
    appElement: document.querySelector('.section4'),
    activatd: '#section4-tab1',
    toggleModel: () => window.innerWidth < 1200,
    onUpdated: (item, action, i) => {
        if (window.innerWidth > 1200) {
            // accordion.toggle(i);
            // console.log(action)
            // action === 'add' ? accordion.open(i) : accordion.close(i);
            accordion.open(i);
        }
    }
});

const toggleModelLg = window.matchMedia("(max-width: 1023px)");
toggleModelLg.addEventListener("change", (e) => {
    section4Tab.active(0)
});

const toggleModelBase = window.matchMedia("(max-width: 1199px)");
toggleModelBase.addEventListener("change", (e) => {
    accordion.closeAll();
    accordion.open(0);
});


const section5Video = VideoHandler({
    appElement: document.querySelector('.section5'),
    viewElement: document.querySelector('.section5 iframe'),
    activatd: 0,
    limit: {
        matchPc: () => window.innerWidth > 768,
        mobile: 3,
        pc: false,
    },
    ignoreCheckMessage: true,
})

const toggleModelMb = window.matchMedia("(max-width: 767px)");
toggleModelMb.addEventListener("change", (e) => {
    setTimeout(() => {
        if (e.matches) {
            section5Video.closeMore();
        } else {
            section5Video.openMore();
        }
    },200)

});

