type Meta = {
    id: string,
    title: string, 
    date: string,
    tags: string[],
}

type BlogPost = {
    meta: Meta,
    content: ReactElement<unknown, string | JSXElementConstructor<any>>
}