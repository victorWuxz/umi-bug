/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Modal} from 'antd';
import {useCreation} from 'ahooks';
import {viewText} from '@/utils/utils';
import styles from './index.less';


interface PreviewModalProp {
    type:string;
    fileSrc:string;
    fileSize?:number;
    visible:boolean;
    onClose:()=>void;
}
const PreviewModal:React.FC<PreviewModalProp> = prop => {
    const {type, onClose, visible, fileSrc, fileSize} = prop || {};
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const [content, setContent] = useState(null);
    const width = useCreation(() => {
        switch (type) {
            case 'audio':
                return '30vw';
            case 'video':
                return '70vw';
            case 'office':
                return '100vw';
            case 'txt':
                return '70vw';
            default:
                return '';
        }
    }, [type]);

    // 取消预览
    const handleCancel = useCallback(() => {
        type === 'audio' && audioRef.current?.pause();
        type === 'video' && videoRef.current?.pause();
        onClose();
    }, [type, audioRef, onClose]);

    // 读取txt
    useEffect(() => {
        if (type === 'txt' && fileSrc && visible) {
            viewText(fileSrc).then(res => {
                setContent(res);
            }).catch(e => {
                setContent('读取失败，请重试');
            });
        }
    }, [type, fileSrc, visible]);

    useEffect(() => {
        visible || setContent(null);
    }, [visible]);

    const modalMap = useCreation(() => ({
        image: <div className={styles.imgContainer}>
                    <img className={styles.img} src={fileSize > 1024 * 500 ? `${fileSrc}?x-oss-process=image/resize,limit_0,w_800/format,webp` : fileSrc} alt="" />
               </div>,
        audio: <audio ref={audioRef} style={{width: '100%'}} src={fileSrc} controls></audio>,
        video: <video ref={videoRef} style={{width: '100%'}} src={fileSrc} controls></video>,
        txt: <pre className={styles.text}>{content || '正在读取请稍后...'}</pre>,
        office: <iframe className={styles.iframe} src={`https://oos.baijia.com/op/view.aspx?src=${fileSrc}`}></iframe>,
        pdf: <iframe className={styles.iframe} src={fileSrc}> </iframe>

    }), [fileSrc, content]);

    return (
        // eslint-disable-next-line react/forbid-component-props
        <Modal centered width={width} visible={visible} onCancel={handleCancel} footer={null} maskClosable={false} title="&nbsp;" className={styles.modal} >
            <div className={styles.container} key={fileSrc}>
                { modalMap[type]}
            </div>
        </Modal>

    );
};
export default PreviewModal;
