/*
 * @Description:
 * @Date: 2022-09-13 17:19:52
 * @FilePath: /quzhou-carbon/src/utils/upload.js
 */
import { Message } from '@arco-design/web-vue';
import { GlobalStore } from '@/stores/modules/global';
let globalStore = GlobalStore();
import { UPDATEPATH } from '@/config/index';

/**自定义上传--可借鉴arco upload自定义上传 */
export function customRequest(option) {
    const { onProgress, onError, onSuccess, fileItem } = option;
    // 限制每个文件大小100M
    if (fileItem.file.size >= 104857600) {
        Message.error('文件过大');
        return false;
    }
    const token = globalStore.token;
    const URL = UPDATEPATH;

    const xhr = new XMLHttpRequest();

    if (xhr.upload) {
        xhr.upload.onprogress = function (event) {
            let percent;
            if (event.total > 0) {
                percent = (event.loaded / event.total) * 100;
            }
            onProgress(parseInt(percent, 10), event);
        };
    }
    xhr.onerror = function error(e) {
        onError(e);
    };
    xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            return onError(xhr.responseText);
        }
        let res = JSON.parse(xhr.response);
        onSuccess(res.data);
    };
    const formData = new FormData();
    formData.append('file', fileItem.file);
    xhr.open('post', URL, true);
    xhr.setRequestHeader('Authorization', token);

    xhr.send(formData);

    return {
        abort() {
            xhr.abort();
        },
    };
}

/**裁剪上传 */
function clipUpload(file, successCb, failCb) {
    const URL = UPDATEPATH;
    const xhr = new XMLHttpRequest();
    // xhr.timeout = 3000;
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    formData.append('fileType', file.type);
    formData.append('fileContentType', file.type);
    formData.append('isGetFileName', file.name);
    xhr.open('post', URL, true);
    /**添加token */
    xhr.setRequestHeader('sessionId', globalStore.token);
    xhr.send(formData);
    xhr.onreadystatechange = function () {
        if (xhr.status < 200 || xhr.status >= 300) {
            failCb && failCb(xhr.responseText);
        } else {
            let response = null;
            if (xhr.response) {
                response = JSON.parse(xhr.response);
                successCb && successCb(response);
            }
        }
    };
}

/**
 * promise结合裁剪上传
 * @param {*} file 文件信息
 * @returns {Promise}
 */
export function clipToUpload(file) {
    return new Promise((resolve, reject) => {
        clipUpload(
            file,
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
            },
        );
    });
}
