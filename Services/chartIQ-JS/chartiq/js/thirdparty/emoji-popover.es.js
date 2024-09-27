/*!
Emoji Popover
Adapted from:
https://github.com/guangzan/emoji-popover
By RB/ChartIQ
MIT License
Copyright (c) 2021 GZ
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
class EmojiPopover {
  constructor(opts) {
    const defaultOptions = {
      container: 'body',
      button: '.e-btn',
      targetElement: '.e-input',
      emojiList: [],
      wrapClassName: '',
      wrapAnimationClassName: 'anim-scale-in'
    };
    this.options = Object.assign({}, defaultOptions, opts);
    this.wrapClassName = 'emoji-wrap';
    this.wrapCountClassName = `emoji-wrap-${Date.now()}`;
    this.init();
    this.createButtonListener();
  }
  init() {
    const { emojiList, container, targetElement, displacements } = this.options;
    const _emojiContainer = this.emojiContainer = this.createEmojiContainer();
    this.emojiList = this.createEmojiList(emojiList);
    _emojiContainer.appendChild(this.emojiList);
    _emojiContainer.appendChild(this.createMask());
 
    const _targetElement = typeof targetElement === "string"
		? document.querySelector(targetElement)
		: targetElement;
    const { offsetTop, offsetHeight, offsetLeft } = _targetElement;
    const { x = 3, y = 12 } = displacements || {};
    _emojiContainer.style.top = `${offsetTop + offsetHeight + y}px`;
    _emojiContainer.style.left = `${offsetLeft + x}px`;
    const _container = typeof container === "string"
		? document.querySelector(container)
		: container;
    _container.appendChild(_emojiContainer);
  }
  destroy() {
	this.emojiContainer.remove();
  }
  createButtonListener() {
    const { button } = this.options;
    const _button = typeof button === "string"
		? document.querySelector(button)
		: button;
    _button.addEventListener('click', () => this.toggle(true));
  }
  /**
   * @returns {HTMLDivElement}
   */
  createEmojiContainer() {
    const { wrapAnimationClassName, wrapClassName } = this.options;
    const container = document.createElement('div');
    container.classList.add(this.wrapClassName);
    container.classList.add(this.wrapCountClassName);
    container.classList.add(wrapAnimationClassName);
    if (wrapClassName !== '') {
      container.classList.add(wrapClassName);
    }
    return container;
  }
  /**
   * @param {IEmojiItem} emojiList
   * @returns {HTMLDivElement}
   */
  createEmojiList(emojiList) {
    const emojiWrap = document.createElement('div');
    emojiWrap.classList.add('emoji-list');
    emojiList.forEach(item => {
      const emojiItem = this.createEmojiItem(item);
      emojiWrap.appendChild(emojiItem);
    })
    return emojiWrap;
  }
  /**
   * @param {IEmojiItem} itemData
   * @returns {HTMLDivElement}
   */
  createEmojiItem(emojiItemData) {
    const { value, label } = emojiItemData;
    const emojiContainer = document.createElement('div');
    let emoji = document.createElement('span');
    emoji.classList.add('emoji');
    emoji.classList.add('emoji-text');
    emoji.innerText = value;
    emojiContainer.classList.add('emoji-item');
    emojiContainer.appendChild(emoji);
    if (typeof label === 'string') {
      emojiContainer.setAttribute('title', label);
    }
    return emojiContainer;
  }
  /**
   * @returns {HTMLDivElement}
   */
  createMask() {
    const mask = document.createElement('div');
    mask.classList.add('emoji-mask');
    mask.addEventListener('click', (e) => {
		e.stopPropagation();
		this.toggle(false);
	});
    return mask;
  }
  /**
   * @param isShow {boolean}
   */
  toggle(isShow) {
    this.emojiContainer.style.display = isShow ? 'block' : 'none';
  }
  onSelect(callback) {
    [...this.emojiList.children].forEach((item) => {
      item.addEventListener('click', (e) => {
		e.stopPropagation();
        this.toggle(false);
        callback(e.currentTarget.innerText);
      })
    })
  }
}
export default EmojiPopover;