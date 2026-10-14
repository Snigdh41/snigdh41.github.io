"use client";
import { useState } from "react";
import {
  allControls,
  noControls,
  controls,
  scenarios,
  evaluate,
  runSuite,
} from "../../../../public/labs/agent-security-engine.mjs";
import s from "./lab.module.css";
export default function AgentLab() {
  const [selected, setSelected] = useState("cross-tenant");
  const [enabled, setEnabled] = useState({ ...allControls });
  const [notice, setNotice] = useState("");
  const scenario = scenarios.find((item) => item.id === selected);
  const baseline = evaluate(scenario, noControls);
  const guarded = evaluate(scenario, enabled);
  const report = runSuite(enabled);
  function download() {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "agent-boundary-lab-results.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Results exported as JSON.");
  }
  return (
    <div className={s.lab}>
      <div className={s.controls}>
        <div>
          <label className={s.label} htmlFor="scenario">
            01 / CHOOSE A SCENARIO
          </label>
          <select
            id="scenario"
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
          >
            {scenarios.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <p className={s.expected}>
            Expected decision: <strong>{scenario.expected}</strong> ·{" "}
            {scenario.kind} fixture
          </p>
        </div>
        <fieldset>
          <legend>02 / CHANGE THE CONTROLS</legend>
          {controls.map((control) => (
            <label className={s.control} key={control.key}>
              <input
                type="checkbox"
                checked={enabled[control.key]}
                onChange={(event) =>
                  setEnabled({
                    ...enabled,
                    [control.key]: event.target.checked,
                  })
                }
              />
              <span>
                <strong>{control.label}</strong>
                <small>{control.description}</small>
              </span>
            </label>
          ))}
          <button
            className={s.reset}
            onClick={() => setEnabled({ ...allControls })}
          >
            Restore all controls
          </button>
        </fieldset>
      </div>
      <div className={s.evidence}>
        <div>
          <span className={s.label}>USER REQUEST</span>
          <p>{scenario.request}</p>
        </div>
        <div>
          <span className={s.label}>UNTRUSTED DOCUMENT / SCENARIO CONTEXT</span>
          <p>{scenario.document}</p>
        </div>
        <div>
          <span className={s.label}>PREDEFINED PROPOSED CALL</span>
          <pre>{JSON.stringify(scenario.call, null, 2)}</pre>
        </div>
      </div>
      <div className={s.compare} aria-live="polite" aria-atomic="true">
        {[
          { label: "Without authorization controls", result: baseline },
          { label: "With your selected controls", result: guarded },
        ].map(({ label, result }) => (
          <section className={s.result} key={label}>
            <h3>{label}</h3>
            <div
              className={`${s.decision} ${result.decision === "deny" ? s.deny : s.allow}`}
            >
              {result.decision === "deny" ? "Blocked" : "Allowed"}
            </div>
            <p>{result.reason}</p>
            <ol>
              {result.checks.map((check) => (
                <li key={check.name}>
                  <span>{check.pass ? "PASS" : "FAIL"}</span> {check.name}
                </li>
              ))}
            </ol>
            <div className={s.effects}>
              <strong>Simulated effects</strong>
              {result.effects.length ? (
                result.effects.map((effect) => <p key={effect}>{effect}</p>)
              ) : (
                <p>No tool effect.</p>
              )}
            </div>
          </section>
        ))}
      </div>
      <p className={s.lesson}>{scenario.lesson}</p>
      <section className={s.suite} aria-labelledby="suite-title">
        <div className={s.suiteHead}>
          <div>
            <span className={s.label}>03 / REPRODUCIBLE FIXTURE RESULTS</span>
            <h2 id="suite-title">What changed across the suite?</h2>
          </div>
          <button className="btn-secondary" onClick={download}>
            Export JSON ↗
          </button>
        </div>
        <div className={s.metrics} aria-live="polite">
          <div>
            <strong>
              {report.correct}/{report.total}
            </strong>
            <span>Expected decisions matched</span>
          </div>
          <div>
            <strong>
              {report.adversarialBlocked}/{report.adversarialTotal}
            </strong>
            <span>Adversarial fixtures blocked</span>
          </div>
          <div>
            <strong>
              {report.legitimateAllowed}/{report.legitimateTotal}
            </strong>
            <span>Legitimate fixtures allowed</span>
          </div>
        </div>
        <ul className={s.results}>
          {report.results.map((row) => (
            <li key={row.id}>
              <button onClick={() => setSelected(row.id)}>{row.title} ↗</button>
              <span>
                {row.decision === row.expected ? "PASS" : "FAIL"} ·{" "}
                {row.decision}
              </span>
            </li>
          ))}
        </ul>
        <p className={s.disclaimer}>
          These counts describe seven fixed tool-call fixtures, not model
          accuracy or a prompt-injection attack-success rate. The simulator
          assumes the proposed call has already been produced.
        </p>
        <p role="status" className={s.disclaimer}>
          {notice}
        </p>
      </section>
    </div>
  );
}
