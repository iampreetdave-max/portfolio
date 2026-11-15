import Finder from "./Finder";

export const metadata = {
  title: "Open Data Finder · Preet Ghanshyam Dave",
  description: "Describe the data you need; get real open datasets from public catalogs, each link checked before it is shown.",
};

export default function OpenData() {
  return (
    <>
      <h1 className="sec-label">Open Data Finder</h1>
      <div className="prose">
        <p>
          Describe the data you need. This searches open catalogs (Hugging Face, Zenodo, NASA Earthdata, Harvard
          Dataverse, US and Canadian city portals, data.europa.eu, the World Bank and Figshare), then fetches every
          link before listing it. Chatbots often invent dataset URLs; nothing appears here unless a catalog returned
          it and the link answered.
        </p>
      </div>
      <Finder />
    </>
  );
}
