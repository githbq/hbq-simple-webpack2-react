import { message, notification } from 'antd';

/**
 * usage:
 *  Tip.createMessage('content').show('info').then(() => {
 *   //when Close
    });
    Tip.create('title','content').show('info').then(() => {
          //when Close
     });
 */
//warn 与 warning是等价的
export const showType = {
        success: 'success',
        error: 'error',
        info: 'info',
        warning: 'warning',
        warn: 'warn',
        loading: 'loading' //message才可用
    }
    //默认标题
export const defaultTitle = {
    success: '成功',
    error: '错误',
    info: '提示',
    warning: '警告',
    warn: '警告'
}
const tipType = { msg: 'message', noti: 'notification' }
let defaultDuration = 3; //停留3秒
/**
 * 对message与notification两种提示做一个封装统一调用方式  
 */
export default class {
    constructor(type, title, content, options) {
        this.type = type;
        this.title = title;
        this.content = content;
        this.handler = notification;
        this.options = options;
        if (type === tipType.msg) { //message模式参数向前推一位
            this.content = title;
            this.options = content;
            this.handler = message;
        }
        this.options = this.options || {};
    }
    getDefaultTitle(showType) {
            return defaultTitle[showType];
        }
        /**
         * 弹出提示  返回一个promise 关闭时
         * @param {展示类型 success|error|info|warning|warn|loading} showType 
         */
    show(type) {
            return new Promise((resolve, reject) => {
                type = type || showType.info;
                if (this.type == tipType.msg) {
                    this.messageInstance = this.handler[type](this.content, this.options.duration || defaultDuration, () => {
                        resolve(this);
                    });
                } else {
                    let options = {
                        message: this.title || this.getDefaultTitle(type),
                        description: this.content,
                        duration: defaultDuration,
                        key: Math.random(), //给一个随机key 确保唯一
                        ...this.options,
                        onClose() {
                            resolve(this);
                        }
                    }
                    this.key = options.key;
                    this.handler[type](options);
                }
            });
        }
        //关闭当前
    close() {
            if (this.type == tipType.msg) {
                this.messageInstance && this.messageInstance();
            } else {
                this.handler.close(this.key);
            }
        }
        //关闭所有
    closeAll() {
            this.handler.destroy();
        }
        /**
         * 打开message提示 
         * @param {内容} content 
         * @param {选项} options 
         */
    static createMessage(content, options) {
            return new this(tipType.msg, content);
        }
        /**
         * 打开notification 右上角通知提示
         * @param {标题} title 
         * @param {内容} content 
         * @param {选项} options 
         */
    static create(title, content, options) {
        return new this(tipType.noti, title, content);
    }
}