import { useEffect, useRef, useState } from "react";

function ChartCanvas({ ariaLabel, config, fallback }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !window.Chart) {
      setIsChartReady(false);
      return undefined;
    }

    chartRef.current = new window.Chart(canvasRef.current, config);
    setIsChartReady(true);

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [config]);

  return (
    <div className="chart-canvas-frame">
      <canvas
        aria-label={ariaLabel}
        className={isChartReady ? "chart-canvas is-ready" : "chart-canvas"}
        ref={canvasRef}
        role="img"
      />
      {!isChartReady && fallback}
    </div>
  );
}

export default ChartCanvas;
