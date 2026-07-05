import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  themeVariables: {
    primaryColor: "#e0f2fe",
    primaryTextColor: "#0f172a",
    primaryBorderColor: "#0284c7",
    lineColor: "#475569",
    secondaryColor: "#dcfce7",
    tertiaryColor: "#fef3c7"
  }
});

export function MermaidDiagram({ chart }) {
  const reactId = useId();
  const diagramId = `diagram-${reactId.replaceAll(":", "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!chart) {
      setSvg("");
      return;
    }

    let isMounted = true;

    async function renderDiagram() {
      try {
        const result = await mermaid.render(diagramId, chart);

        if (isMounted) {
          setSvg(result.svg);
          setError("");
        }
      } catch {
        if (isMounted) {
          setSvg("");
          setError("Diagram could not be rendered. Showing text draft instead.");
        }
      }
    }

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, diagramId]);

  if (!chart) {
    return null;
  }

  if (error) {
    return (
      <div className="visual-fallback">
        <p>{error}</p>
        <pre>{chart}</pre>
      </div>
    );
  }

  return <div className="diagram-view" dangerouslySetInnerHTML={{ __html: svg }} />;
}