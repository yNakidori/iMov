import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './insta/styles.module.css';
import MenuAppBar from '../../src/components/MenuAppBar';

export function InstagramEmbed() {
    const [feedList, setFeedList] = useState([]);

    useEffect(() => {
        async function getInstaFeed() {
            const token = process.env.REACT_APP_INSTAGRAM_TOKEN;
            const fields = "media_url,media_type,permalink";
            const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;
            const { data } = await axios.get(url)
            setFeedList(data.data)
        }

        getInstaFeed();
    }, []);

    return (
        <>
            <div className='bg-sky-100'>
                <MenuAppBar />
                <section className={styles.container}>
                    {feedList.map(item => (
                        <a key={item.id} href={item.permalink} target='_blank' rel='noreferrer' className={styles.itens}>
                            {item.media_type === "IMAGE" ? <img src={item.media_url} /> : (
                                <video controls>
                                    <source src={item.media_url} />
                                </video>
                            )}
                        </a>
                    ))}
                </section>
            </div>
        </>
    )
}

export default InstagramEmbed;
