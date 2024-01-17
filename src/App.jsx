import { useState } from 'react'
import './App.css'

function New(props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
}

function Popular(props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
}

const Wrapped = (Video, Article) => {
    function Component (props) {
    switch (props.type) {
        case 'video':
            return (
            <Video {...props}/>
        );

        case 'article':
            return (
            <Article {...props}/>
        );
    }}

    return function Enhanced (props) {
        if (props.views > 1000) return (
        <Popular>
            <Component {...props} />
        </Popular>
        )

    else if (props.views < 50) return (
        <New>
            <Component {...props} />
        </New>
        );

        else return (
        <Component {...props} />
        )
    }
}

const WrappedItem = Wrapped(Video, Article);

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
}

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
}

function List(props) {
    return props.list.map(item => {
        return <WrappedItem key={item.id} {...item}/>
    });
}

export default function App() {
    const [list] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50,
            id: 1,
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12,
            id: 2,
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175,
            id: 3,
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532,
            id: 4,
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253,
            id: 5,
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
            id: 6,
        },
    ]);

    return (
        <List list={list} />
    );
}
