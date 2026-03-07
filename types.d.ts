type Meta = {
    id: string,
    title: string, 
    date: string,
    author: string,
    tags: string[],
    readingTime: string
}

type BlogPost = {
    meta: Meta,
    content: ReactElement<unknown, string | JSXElementConstructor<any>>
}