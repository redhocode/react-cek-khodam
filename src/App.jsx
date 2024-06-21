import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Harus diisi!")
    .min(3, "Terlalu pendek!")
    .max(20, "Terlalu panjang!"),
});

const images = [
  "https://cdn.pixabay.com/photo/2014/11/15/15/11/take-532097_960_720.jpg",
  "https://cdn.pixabay.com/photo/2024/02/05/16/23/labrador-8554882_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/01/11/23/40/guinea-pig-242520_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/04/07/05/39/labrador-retriever-6158095_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/01/23/17/35/monkey-4788328_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/12/30/16/50/animal-6904320_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/01/20/19/57/rodent-3095272_960_720.jpg",
  "https://cdn.pixabay.com/photo/2012/02/21/08/12/cockroach-15093_960_720.jpg",
  "https://cdn.pixabay.com/photo/2015/06/26/08/37/rat-822288_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/08/18/16/16/grasshopper-2655486_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/04/05/11/06/grasshopper-314406_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/11/19/11/01/jellyfish-1838613_960_720.jpg",
  "https://cdn.pixabay.com/photo/2022/01/26/20/43/baboon-6969935_960_720.jpg",
];

function App() {
  const [imageUrl, setImageUrl] = useState(images[0]);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
      <div className="mt-3">
        <div className="shadow-xl card w-96 bg-base-100">
          <div className="card-body">
            <h2 className="justify-center mb-4 text-4xl underline uppercase card-title underline-offset-5">
              Cek Khodam
            </h2>
            <p className="justify-center mx-auto mb-4 text-gray-600">
              99% Akurat
            </p>
            <Formik
              initialValues={{ name: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setLoading(true);
                setTimeout(() => {
                  const index = Math.floor(Math.random() * images.length);
                  setImageUrl(images[index]);
                  setLoading(false);
                  setSubmitting(false);
                  setIsSubmitted(true);
                  setSubmittedName(values.name);
                }, 2000); // Simulate a network request
              }}
            >
              {({ values, handleChange, isSubmitting, resetForm }) => (
                <Form>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Masukkan Nama Anda"
                    className="w-full max-w-xs input input-bordered"
                    onChange={handleChange}
                    value={values.name}
                    disabled={isSubmitting || isSubmitted}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                  <button
                    type="submit"
                    className="w-full mt-4 btn btn-outline"
                    disabled={isSubmitting || isSubmitted}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="w-full mt-4 btn btn-outline"
                    onClick={() => {
                      resetForm();
                      setIsSubmitted(false);
                      setImageUrl(images[0]);
                      setSubmittedName(""); // Reset image to initial state if needed
                    }}
                  >
                    Cek Lagi
                  </button>
                  {isSubmitted && (
                    <div className="flex flex-col items-center justify-center gap-2 mx-auto mt-4 text-green-500">
                      <div className="badge badge-lg badge-outline">
                        {submittedName}
                      </div>
                      Khodamu adalah
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
          <figure>
            {loading ? (
              <div className="flex items-center justify-center py-3">
                <span className="loading loading-infinity loading-lg"></span>
              </div>
            ) : (
              <img src={imageUrl} alt="Khodam" />
            )}
          </figure>
        </div>
      </div>
      <div className="flex gap-2 mt-3 cursor-pointer">
        <a href="https://github.com/redhocode" target="_blank" rel="noreferrer">
          <p className=" text-slate-400">Develop By Redhocode</p>
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="justify-center w-6 h-6 mx-auto cursor-pointer text-slate-400"
            fill="currentColor"
          >
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;
