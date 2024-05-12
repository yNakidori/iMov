import { useEffect, useState } from 'react';

export function InstagramEmbed() {


    async function getInstagramEmbed() {
        const token = process.env.REACT_APP_INSTA_TOKEN;
        const fields = "media_url,media_type,permalink";
        const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;

    }



    return (
        <>
        </>
    )
}


export default InstagramEmbed;
