import React from 'react';
import { notFound } from 'next/navigation';
import { ARTICLES_DATA } from '../data';
import ArticleView from './ArticleView';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const article = ARTICLES_DATA.find((a) => a.id.toString() === id);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: `${article.title} - Rupie Times Talk`,
        description: article.description,
    };
}

export default async function Page({ params }) {
    const { id } = await params;
    const article = ARTICLES_DATA.find((a) => a.id.toString() === id);

    if (!article) {
        notFound();
    }

    return <ArticleView article={article} />;
}
