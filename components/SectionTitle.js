export default function SectionTitle({eyebrow,title,href}){return <div className="section-title"><div><span>{eyebrow}</span><h2>{title}</h2></div>{href&&<a href={href}>Lihat semua →</a>}</div>}
