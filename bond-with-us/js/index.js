function outerHeight(el) {
    const style = getComputedStyle(el);
    return (
        el.getBoundingClientRect().height +
        // parseFloat(style.marginTop) +
        // parseFloat(style.marginBottom)
        // el.offsetHeight +
        parseFloat(style.getPropertyValue('margin-top')) +
        parseFloat(style.getPropertyValue('margin-bottom'))
    );
}

/**
 * 頁籤切換 （沒自帶動畫）
 * @typedef {'add' | 'remove'} TabAction
 * @typedef {{
 *  appElement: Element;
 *  activatd?: string;
 *  toggleModel: () => boolean;
 *  onUpdated: (target: Element, i: number, action: TabAction) => void;
 *  nextElement?: Element,
 *  prevElement?: Element
 * }} TabConfig
 * @param {TabConfig} config 
 * @returns 
 */
function TabHandler(config) {
    const {
        appElement,
        activatd,
        toggleModel = () => false,
        onUpdated = (target, action, i) => { },
        nextElement,
        prevElement,
    } = config;

    if (!appElement) throw new Error('缺少 appElement 傳參: 請傳入父層 Element');

    const dateset = {
        label: '[data-tab]',
        content: '[data-tab-content]',
    }
    const ACTION_NAME = {
        ADD: 'add',
        REMOVE: 'remove'
    }

    let _activatd = activatd;
    const tabs = [...appElement.querySelectorAll(dateset.label)].filter((item) => item.dataset['tab'] !== undefined);
    const contents = [...appElement.querySelectorAll(dateset.content)].filter((item) => item.dataset['tabContent'] !== undefined);
    const tabNames = [...tabs.reduce((data, tab)=> {
        data = new Set([...data, tab.dataset['tab']]) 
        return data
    },[])]

    const resetActive = () => {
        tabs.forEach((item) => item.classList.remove('is-active'));
        contents.forEach((item) => item.classList.remove('is-active'));
    }


    const handleActiveTarget = (targetName, action, i) => {
        resetActive();
        tabs.forEach((item) => item.dataset['tab'] === targetName && item.classList[action]('is-active'));
        appElement.querySelectorAll(targetName).forEach((item) => item.classList[action]('is-active'));
        onUpdated(targetName, action, i);

        _activatd = ACTION_NAME.ADD === action ? targetName : '';

        if (!prevElement || !nextElement) return;

        prevElement.disabled = tabNames.indexOf(_activatd) - 1 < 0;
        nextElement.disabled = tabNames.indexOf(_activatd) + 1 >= tabNames.length;
    }

    const active = (i) => {
        const targetName = tabs[i].dataset['tab'];
        handleActiveTarget(targetName, ACTION_NAME.ADD, i);
    }

    const prev = () => {
        const index = tabNames.indexOf(_activatd) - 1;
        const targetName = tabNames[index];
        if (!targetName) return;

        handleActiveTarget(targetName, ACTION_NAME.ADD, index);
    }
    const next = () => {
        const index = tabNames.indexOf(_activatd) + 1;
        const targetName = tabNames[index];
        if (!targetName) return;

        handleActiveTarget(targetName, ACTION_NAME.ADD, index);
    }

    const init = () => {
        let activeTarget = null;
        tabs.forEach((tab, i) => {
            const targetName = tab.dataset['tab'];

            tab.addEventListener('click', (e) => {
                // e.stopPropagation();
                // console.log('helloo', targetName, i)

                let action = ACTION_NAME.ADD;

                if (toggleModel && toggleModel()) {
                    action = tab.classList.contains('is-active') ? ACTION_NAME.REMOVE : ACTION_NAME.ADD;
                }
                handleActiveTarget(targetName, action, i);
            })

            if (activatd === targetName) {
                activeTarget = tab;
            }
        })

        const tab = activeTarget || tabs[0];
        const targetName = tab.dataset['tab'];
        tab.click();
        _activatd = targetName;

        prevElement && prevElement.addEventListener('click', prev);
        nextElement && nextElement.addEventListener('click', next);
    }

    init();

    return {
        appElement,
        tabs,
        contents,
        active,
        prev,
        next,
        handleActiveTarget,
    }
}

/**
 * 影片切換 （沒自帶動畫）
 * @typedef {
 *   matchPc: () => boolean;
 *   mobile: boolean;
 *   pc: boolean
 * } Limit
 * @typedef {{
*  appElement: Element;
*  viewElement: Element;
*  activatd?: string;
*  limit: Limit;
* }} VideoConfig
* @param {VideoConfig} config 
* @returns 
*/
function VideoHandler(config) {
    const {
        appElement,
        viewElement,
        activatd = 0,
        limit = {
            matchPc: () => true,
            mobile: false,
            pc: false,
        },
        ignoreCheckMessage = false
    } = config;
    if (!appElement) {
        if (ignoreCheckMessage) return;
        throw new Error('缺少 appElement 傳參: 請傳入父層 Element')
    };
    if (!viewElement) {
        if (ignoreCheckMessage) return;
        throw new Error('缺少 viewElement 傳參: 請傳入主畫面容器 Element')
    };

    const dateset = {
        videoList: '[data-video-list]',
        main: '[data-video]',
        videoType: '[data-video-type]',
        img: '[data-video-img]',
        title: '[data-video-title]',
        moreBtn: '[data-video-more-btn]',
    }
    const VIDEO_TYPE = {
        YT: 'yt',
        FILE: 'file'
    }

    const getYtEmbed = (id) => `https://www.youtube.com/embed/${id}`;
    const getYtImg = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

    const videos = [...appElement.querySelectorAll(dateset.main)];
    const videoList = appElement.querySelector(dateset.videoList);
    const moreBtn = appElement.querySelector(dateset.moreBtn);

    const resetActive = () => {
        videos.forEach((item) => item.classList.remove('is-active'));
    }
    const setViewElement = (item) => {
        const { videoType } = item.dataset;
        let { video } = item.dataset;
        if (videoType === VIDEO_TYPE.YT) {
            video = getYtEmbed(video)
        }
        viewElement.src = video;
        viewElement.title = item.querySelector(dateset.title).innerText;
    }
    const getMaxLimit = () => {
        return limit.matchPc() ? limit.pc : limit.mobile;
    }
    const openMore = () => {
        const maxLimit = getMaxLimit();
        videoList.style.height = maxLimit ? videos.slice(0, videos.length).reduce((count, v) => count += outerHeight(v), 0) + 'px' : 'auto';
        moreBtn && (moreBtn.querySelector('.video-list__more-btn__text').innerText = '收合影片');
    }
    const closeMore = () => {
        const maxLimit = getMaxLimit();
        videoList.style.height = maxLimit ? videos.slice(0, maxLimit).reduce((count, v) => count += outerHeight(v), 0) + 'px' : 'auto';
        moreBtn && (moreBtn.querySelector('.video-list__more-btn__text').innerText = '按下觀看更多影片')
    }
    const initLimit = () => {
        // TODO
        if (getMaxLimit()) {
            setTimeout(() => {
                closeMore();
            }, 200)
        }
        moreBtn && moreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.currentTarget.classList.toggle('is-open');
            e.currentTarget.classList.contains('is-open') ? openMore() : closeMore();
        })

    }

    const init = () => {
        videos.forEach((item, i) => {
            const { videoType } = item.dataset;
            let { video } = item.dataset;

            if (i === activatd) {
                item.classList.add('is-active');
                setViewElement(item)
            }

            if (videoType === VIDEO_TYPE.YT) {
                video = getYtImg(video);
            }

            item.querySelector(dateset.img).src = video;

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                resetActive();
                setViewElement(item)
                item.classList.add('is-active');
            })
        })
        initLimit();
    }

    init();

    return {
        openMore,
        closeMore,
    }
}