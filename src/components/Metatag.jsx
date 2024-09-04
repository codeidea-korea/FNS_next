import {Helmet} from "react-helmet-async";

const Metatag = ({url = decodeURIComponent(window.location.href), title = '', desc = '', image = '', date = ''}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta charSet={'utf-8'}/>

            <meta property="og:type"        content="website"/>
            <meta property="og:url"         content={url}/>
            <meta property="og:title"       content={title}/>
            <meta property="og:description" content={desc}/>
            <meta property="og:image"       content={image}/>

            <meta name="viewport"           content="width=device-width, initial-scale=1.0"/>
            <meta name="copyright"          content="Copyrights © 2024 패션앤스타일컴퍼니 주식회사 All Rights Reserved"/>
            <meta name="robots"             content="index, follow"/>
            <meta name="author"             content="패션앤스타일컴퍼니 주식회사"/>
            <meta name="title"              content={title}/>
            <meta name="subject"            content={title}/>
            <meta name="description"        content={desc}/>
            <meta name="keywords"           content={desc}/>
            <meta name="date"               content={date}/>
            <meta name="build"              content={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 19).replace('T', ' ')}/>
        </Helmet>
    )
}

export default Metatag;