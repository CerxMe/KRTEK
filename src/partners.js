// a directory of boards to extract offers from
export const partnerList = [
    {
        id: "jobs.cz",
        searchLink: "",
        adapter: _
    },
    {
        id: "webtrh.cz",
        searchLink: "https://webtrh.cz/poptavky/",
        adapter: _
    },
    {
        id: "webtrh.cz",
        searchLink: "https://webtrh.cz/nabidky-prace/",
        adapter: _
    }
]

export function recursiveSearch(partner){
    const timeLimit = 24 * 60 * 1000 // discard anything older than this


}