# What eye tracking actually tells you

Working notes from the AI assisted academic search study with Dr. Fei Yu. The tl;dr is
that eye tracking data looks objective but is full of interpretive choices.

## The three signals

- **Fixation duration.** How long the eye dwells at a point. Often read as cognitive load,
  but it can also just mean the text is small or the reader is tired.
- **Saccade rate.** Jumps between fixations. Fast saccades suggest skimming or searching,
  slow and few suggest focused reading.
- **Pupil dilation.** Correlates with arousal or effort. Extremely sensitive to lighting,
  which is why a controlled room matters.

## What a heatmap hides

A heatmap collapses time. Two participants who both stared at a result card for ten
seconds look identical on a heatmap, even if one read it carefully and the other was
stuck and confused. Gaze replay with think aloud helps recover what the heatmap flattens.

## Design implications we are testing

- **Citation verification cues.** Do explicit provenance markers reduce time on source
  evaluation?
- **Query scaffolding.** Does a prompt template reduce reformulation cycles?
- **Librarian facing dashboard.** Aggregated patterns, never individual gaze data.

## Related

- [[osint-intro|OSINT orientation]] for similar questions about inferring intent from
  observable traces.
