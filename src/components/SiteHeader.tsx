import "./SiteHeader.css"

const SiteHeader: React.FC = () => {
    return (
        <div className="header flex flex-col items-center py-14 text-1xl">
            <h1 className="text-4xl font-bold pb-2">アジ鯖リソースパック</h1>
            <p>リソースパック(テクスチャ)を<u>今すぐダウンロード</u>できます。</p>
            <p>ダウンロードしたいリソースパックを選択してください。</p>
        </div>
    )
}

export default SiteHeader