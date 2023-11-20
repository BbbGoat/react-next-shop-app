import React from "react";
import styles from "./Loader.module.scss";
import { ThreeDots } from 'react-loader-spinner';

interface ILoaderProps {
    basic?: boolean;
}

const Loader = ({ basic }: ILoaderProps) => {

    if (basic) {
        return (
            <div className={styles.basicWrapper}>
                <ThreeDots 
                    // height="80" 
                    width="30" 
                    radius="9"
                    color="grey" 
                    ariaLabel="three-dots-loading"
                    visible={true}
                />
            </div>
        )
    }
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <ThreeDots 
                    // height="80" 
                    width="55" 
                    radius="9"
                    color="grey" 
                    ariaLabel="three-dots-loading"
                    visible={true}
                />
            </div>
        </div>
    )
};

export default Loader;
