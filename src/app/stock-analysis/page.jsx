export default function StockAnalysisLayout({ children }) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Stock Analysis</h1>
        <nav className="mb-4">
          <ul className="space-y-4">
            <li className="break-words">
              <a href="/stock-analysis/tsla" className="text-blue-500 hover:underline">
                Tesla (TSLA)
              </a>
            </li>
            <li className="break-words">
              <a href="/stock-analysis/djt" className="text-blue-500 hover:underline">
                Trump Media & Technology Group Corp. (DJT)
              </a>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    );
  }