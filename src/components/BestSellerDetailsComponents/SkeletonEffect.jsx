const SkeletonEffect = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row gap-5">
          {/* Left Side (Images) */}
          <div className="d-flex gap-4">
            <div className="d-flex flex-column gap-3">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="placeholder-glow rounded"
                  style={{ width: 70, height: 70 }}
                >
                  <span className="placeholder w-100 h-100 d-block rounded"></span>
                </div>
              ))}
            </div>
            <div
              className="placeholder-glow rounded"
              style={{ width: 400, height: 300 }}
            >
              <span className="placeholder w-100 h-100 d-block rounded-5"></span>
            </div>
          </div>

          {/* Right Side (Info) */}
          <div className="flex-fill">
            <h2 className="placeholder-glow mb-3">
              <span className="placeholder col-6"></span>
            </h2>

            {[...Array(6)].map((_, i) => (
              <div className="mb-3" key={i}>
                <p className="placeholder-glow mb-1">
                  <span className="placeholder col-4"></span>
                </p>
                <p className="placeholder-glow">
                  <span className="placeholder col-8"></span>
                </p>
              </div>
            ))}

            <div className="mt-4">
              <div className="placeholder-glow mb-3">
                <span className="placeholder col-12 py-2 rounded d-block"></span>
              </div>
              <div className="placeholder-glow">
                <span className="placeholder col-12 py-2 rounded d-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonEffect;
