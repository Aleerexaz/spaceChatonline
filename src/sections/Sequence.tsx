import { LitText, usePinnedProgress } from '@/hooks/useProgress'

/** Three lines, lit one word at a time by the scroll. Nothing else on screen. */
export default function Sequence() {
  const [ref, p] = usePinnedProgress<HTMLElement>()
  return (
    <section ref={ref} className="seq" aria-label="No account. No tower. No feed.">
      <div className="seq__stick">
        <div className="wrap">
          <h2 className="display seq__text">
            <LitText lines={['No account.', 'No tower.', 'No feed.']} progress={p} from={0.06} to={0.84} />
          </h2>
          <div className="seq__rail" aria-hidden="true">
            <span style={{ transform: `scaleX(${p.toFixed(3)})` }} />
          </div>
        </div>
      </div>
    </section>
  )
}
