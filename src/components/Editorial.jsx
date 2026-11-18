import React from "react";
import { Photo, Icon } from "../shared";
import { useFadeIn } from "../hooks/useFadeIn";
export default function Editorial({ type }) {
  const harm = type === "harm";
  const ref = useFadeIn();
  return (
    <section
      id={harm ? "formulations" : "about"}
      className={"split anim-fade-up " + (harm ? "harm" : "dermatology")}
      ref={ref}
    >
      <Photo
        name={harm ? "formulations" : "derm"}
        alt={
          harm
            ? "Remedy formulation and dermatology instruments"
            : "Dr. Muneeb Shah, dermatologist and founder of Remedy"
        }
      />
      <div className="editorial">
        {harm ? (
          <>
            <h2>
              <Photo name="harm" alt="Do No Harm" />
            </h2>
            <div className="principles">
              <p>
                Remedy is guided by the medically-inspired principle of{" "}
                <strong>Do No Harm™.</strong> We exclude common contact
                allergens and irritants in our formulas to deliver effective
                dermatologist developed solutions.
              </p>
              <div>
                <ul>
                  {[
                    "Derm-Developed",
                    "Hypoallergenic",
                    "Clinically Tested",
                  ].map((t) => (
                    <li key={t}>✓ {t}</li>
                  ))}
                </ul>
                <ul>
                  {[
                    "fragrances",
                    "common allergens",
                    "common irritants",
                    "animal testing",
                  ].map((t) => (
                    <li key={t}>
                      <em>NO</em> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2>
              Dermatology <u>for all</u>
            </h2>
            <p>
              Designed by a dermatologist with an expert's eye and years of
              experience, our remedies are crafted with gold-standard science
              and backed by industry-leading certifications.
            </p>
          </>
        )}
        <a
          className="editor-link"
          href={harm ? "#formulation-details" : "#about-details"}
        >
          {harm ? "Our formulations" : "Learn more about us"}{" "}
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
