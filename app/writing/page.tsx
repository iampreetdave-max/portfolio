import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { writing } from "@/lib/writing";

export const metadata = pageMeta({ title: "Writing", description: "Writing by Preet Dave: the Tensor Tapri weekly AI newsletter for India, engineering write-ups on CityShield and LedgerLens, and essays on AI.", path: "/writing" });

export default function Writing() {
  return (
    <>
      <h1 className="sr-only">Writing by Preet Dave</h1>
      <div className="rowlist">
      {writing.map((a) => (
        <div className="row" key={a.title}>
          <div className="row-main">
            <div className="row-title">
              {a.slug ? (
                <Link href={`/writing/${a.slug}`}>{a.title}</Link>
              ) : (
                <a href={a.href} target="_blank" rel="noopener noreferrer">{a.title}</a>
              )}
            </div>
            <div className="row-note">{a.note}</div>
          </div>
          <div className="row-when">{a.when}</div>
        </div>
      ))}
    </div>
    </>
  );
}
