import styles from './Blobs.module.css';

import bottomBlob from '/blobs/bottom-blob.svg';
import topBlob from '/blobs/top-blob.svg';
import leftBottomBlob from '/blobs/left-bottom-blob.svg';
import rightBottomBlob from '/blobs/right-bottom-blob.svg';
import rightTopBlob from '/blobs/right-top-blob.svg';

const blobs = [
    {src: topBlob, position: styles.top},
    {src: bottomBlob, position: styles.bottom},
    {src: leftBottomBlob, position: styles.leftBottom},
    {src: rightBottomBlob, position: styles.rightBottom},
    {src: rightTopBlob, position: styles.rightTop},
];

function Blobs() {
    return (
        <>
            {blobs.map((blob, index) => (
                <img
                    key={index}
                    src={blob.src}
                    alt={`blob-${index}`}
                    className={`${styles.blob} ${blob.position}`}
                />
            ))}
        </>
    );
}

export default Blobs;
