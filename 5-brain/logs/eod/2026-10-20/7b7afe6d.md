# Repo setup and learning path — C--TRANSDEV-HUB — C:\TRANSDEV HUB
session 7b7afe6d-c7fc-4b47-b282-ff83a9a49300

[10:32] GREG: make sure the entire repo is in our transdev hub project folder and routed properly. then run the start learning from our leaning.md file https://github.com/rohitg00/ai-engineering-from-scratch

[10:39] CLAUDE: The repo is now in your Transdev Hub folder and linked from `CLAUDE.md`. Your placement from today is already in `LEARNING.md`, so I skipped the interview and went straight to Lesson 1.

- **Repo:** cloned to `references/ai-engineering-from-scratch/` (8,720 files, latest snapshot).
- **Routing:** `CLAUDE.md` has two new rows, one for `LEARNING.md` and one for the repo.
- **Skills:** `learn`, `start-learning` and `check-understanding` are copied into `.claude/skills/`, so you can type `/learn` for each new lesson.
- **Not done:** I haven't logged anything in `docs/timeline.md` yet, and the BOULON HQ page hasn't been refreshed.

---

## Lesson 1 of 523 — Phase 1: Linear Algebra Intuition (~60 min)

**Why it matters for BOULON:** when your agent finds the right manual passage for a mechanic's question, it is comparing lists of numbers. Each passage and each question becomes a list of about 1,000 numbers (a *vector*). Search finds the passages whose list points the same way as the question's. The measure for "points the same way" is the **dot product**: multiply the two lists number by number, then add up the results.

**Quick example.** Two short lists:
- Question: `[3, 2]`
- Passage A: `[3, 2]` (same direction)
- Passage B: `[-2, 3]` (at a right angle)

The dot product of the question and Passage A is 3×3 + 2×2 = **13**. A big positive number means similar.

**First question for you.** Work out the dot product of the question `[3, 2]` and Passage B `[-2, 3]` (multiply across, t […]

[10:42] GREG: 0 so they must be unrelated?

[10:42] CLAUDE: Yes, that's right: **0, B, unrelated**. The check: 3×(−2) = −6 and 2×3 = 6, so −6 + 6 = 0. A dot product of 0 means the two lists sit at a right angle and share nothing. A big positive number means similar, and a negative one means opposite.

Now I'll run the lesson's code so you can see it on real numbers.

[10:42] CLAUDE: The crash is only Windows failing to print an arrow symbol, so I'll re-run it with UTF-8 output.

[10:42] CLAUDE: Here is what the output shows:

- **`cosine_similarity(a, b) = 0.9746`**: this is the dot product rescaled to run from −1 to 1, so a score near 1 means "almost the same direction". RAG search ranks passages by exactly this kind of score.
- **`Angle ... [1,0] and [0,1]: 90°`**: this is your answer from before. Right angle means dot product 0.
- **`{e1, e2, 2*e1+e2} independent: False`**: the third list is just the first two mixed together, so it adds no new information.
- **`Neural Network Layer`**: a layer is a grid of numbers (a *matrix*) that turns a 3-number input into a 2-number output. A full model is thousands of these stacked.

**Check question (no stakes).** The code printed `cosine_similarity(a, b) = 0.9746` for `a = [1,2,3]` and `b = [4,5,6]`. Which statement is right?

- **A.** a and b point in nearly the same direction.
- **B.** a and b are unrelated.
- **C.** a and b are opposites.

Reply with one letter. After that comes the 6-question quiz, which I'll log in `LEARNING.md`.

**Next actions**
1. You: answer A, B or C.
2. Me: run the quiz one question at a time, then record your score and set up the next lesson (Vectors and Matrices Operations).
3. Me: log today in `docs/timeline.md` and refresh BOULON HQ at the end of this lesson.

[10:48] GREG: a

[10:48] CLAUDE: **A is correct.** At 0.9746, a and b point in nearly the same direction.

## Quiz: 3 questions, no hints

**Question 1 of 3.** Three lists: `v1 = [1,0,0]`, `v2 = [0,1,0]`, `v3 = [2,1,0]`. Are they linearly independent, meaning each adds new information?

- **A.** Yes, because there are three vectors in 3D space.
- **B.** No, because v3 = 2×v1 + v2, so v3 is a mix of the others.
- **C.** Yes, because none of the vectors are identical.
- **D.** No, because they all have a zero component.

Reply with one letter.

[10:49] GREG: b

[10:50] CLAUDE: **B is correct (1/1).** v3 = 2×v1 + v2, so the set is dependent. All three lists lie flat in one plane and can never reach `[0,0,1]`. Having 3 vectors in 3D doesn't guarantee 3 dimensions of information.

**Question 2 of 3.** What does the *rank* of a matrix tell you in machine learning?

- **A.** The number of linearly independent columns, which is how many dimensions of useful information it holds.
- **B.** The maximum value in the matrix.
- **C.** How fast the matrix can be multiplied.
- **D.** The number of non-zero entries in the matrix.

Reply with one letter.

[10:51] GREG: a

[10:51] CLAUDE: **A is correct (2/2).** Rank counts the genuinely independent directions in a matrix. In the code output, `[[1,2],[2,4]]` had rank 1 because its second row is just double the first.

**Question 3 of 3.** How does LoRA (Low-Rank Adaptation) use linear algebra to fine-tune large language models cheaply?

- **A.** It splits the weight update into two small low-rank matrices instead of updating the full weight matrix.
- **B.** It removes unused rows from weight matrices to shrink the model.
- **C.** It freezes the embedding layer and only trains the output head.
- **D.** It converts all weights from float32 to int8.

Reply with one letter.

[10:53] GREG: idk

[10:54] CLAUDE: "I don't know" is a fine answer. I've counted it as a miss.

**Answer: A.** A big model has weight matrices with millions of numbers, and retraining all of them is expensive. LoRA leaves the big matrix frozen. It learns the change as the product of two thin matrices, which is a low-rank update, so it trains far fewer numbers. This is the rank idea from Question 2, and it's how you could cheaply customize a model to mechanic vocabulary later.

## Lesson 1 result: 2/3

- You got the dot product, independence and rank right.
- LoRA is in your review queue in `LEARNING.md`. That's under 70%, but it's a concept for Phase 11, not a basic you need now.
- `docs/timeline.md` has today's entry.
- I haven't refreshed BOULON HQ yet.

**Next lesson:** Lesson 2, Vectors and Matrices Operations (Phase 1). It covers how to add, scale and multiply these lists and grids, which is what happens when your agent turns a question into numbers.

**Next actions**
1. You: say "next lesson" or `/learn` when you're ready for Lesson 2. I'll open with two quick recall questions from this lesson.
2. Me: refresh BOULON HQ with today's learning progress. I can do it now or fold it into the end of the next lesson.

[10:56] GREG: next lesson

[10:56] CLAUDE: ## Warm-up recall (no stakes, no score)

Two quick questions from Lesson 1 before the new material.

**Recall 1.** What does the dot product of two vectors measure?

- **A.** The number of dimensions the vectors share
- **B.** How similar or aligned the two vectors are
- **C.** The distance between the two vectors
- **D.** The angle between the vectors in degrees

**Recall 2.** In AI, what does *embedding* refer to?

- **A.** Converting code to machine instructions
- **B.** A technique for compressing model weights
- **C.** Inserting one model inside another
- **D.** A vector representation that captures the meaning of something (a word, an image, a user)

Reply with two letters, for example "X, Y". "idk" is fine too. Then we start Lesson 2, Vectors and Matrices Operations.

[10:58] GREG: b d

[10:59] CLAUDE: **Recall: both correct.** B (dot product = how aligned two vectors are) and D (an embedding is a vector that captures meaning). Good retention.

---

## Lesson 2: Vectors, Matrices & Operations (~60 min)

**The problem.** A neural network layer is one line of code: `output = activation(weights @ input + bias)`. The `@` is *matrix multiplication*. Once you can read that line, you can read what any model does to its data. Your agent's search runs on this same operation, comparing a question against thousands of passages at once.

**The idea.** A *matrix* is a grid of numbers: rows and columns. Think of the table of parts in a maintenance manual, with one row per part and one column per measurement. Matrix multiplication takes each row of the first grid, does a dot product (last lesson) with each column of the second grid, and fills in the answers. Here's a small example:

```text
[1 2]   [5 6]   [1·5+2·7   1·6+2·8]   [19 22]
[3 4] @ [7 8] = [3·5+4·7   3·6+4·8] = [43 50]
```

There is one strict rule: the inner sizes must match. A (2 rows × 3 columns) grid can multiply a (3 × 4) grid, because the two 3s match. The result is (2 × 4).

**Comprehension question (before we run code).** Grid A is 3 rows × 5 columns, and grid B is 5 rows × 2 columns. Can you compute A @ B? If so, what size is the result?

- **A.** No, the sizes don't match.
- **B.** Yes, the result is 3 × 2.
- **C.** Yes, the result is 5 × 5.
- **D.** Yes, the result is 3 × 5.

Reply with one letter.

**Next actions** […]

[11:03] GREG: b

[11:04] CLAUDE: **B is correct.** (3×5) @ (5×2): the inner 5s match and drop out, leaving **3×2**.

## What the code showed

- **`A * B` vs `A @ B`:** the same two grids gave `[[5,12],[21,32]]` (multiply matching positions) and `[[19,22],[43,50]]` (row-by-column dot products). Different operations, different answers.
- **Broadcasting:** the bias `[10,20,30]` was added to both rows of the output grid, even though the shapes differ. Frameworks stretch the small one automatically.
- **Weight matrix as "detectors":** each row of `W` picks out a pattern. Row 3 averaged features 1 and 2, giving 0.7.
- **Forward pass:** a full 2-layer network ran as `(4×3) @ (3×1)`, then ReLU (negatives become 0), then `(2×4) @ (4×1)`. That is a neural network, with the shapes matching at every step.

**Use it.** In the real libraries (NumPy, PyTorch) this is one line, `W @ x + b`. Both libraries also check the shape rule and do the broadcasting for you.

## Quiz: 2 questions, no hints

**Question 1 of 2.** Which property follows from a zero determinant?

- **A.** The matrix is singular and cannot have an inverse.
- **B.** The matrix preserves lengths while rotating the input.
- **C.** The matrix is an identity transformation with no scaling.
- **D.** The matrix contains zero in every row and column.

Reply with one letter.

[11:08] GREG: idk

[11:08] CLAUDE: "I don't know" is fine. It counts as a miss, and here is the answer.

**A is correct.** The determinant is a single number summarizing a matrix. In the code, `det(A) = 10` and the inverse existed. If the determinant is 0, the matrix squashes information flat, like the dependent vectors from Lesson 1, so nothing can undo it. That makes it *singular*, meaning it has no inverse. This links to Lesson 1: a matrix with dependent columns has a zero determinant, so a zero determinant means the same redundancy problem as in your dependent feature columns.

**Question 2 of 2.** How does the transpose operation change a matrix?

- **A.** It replaces every off-diagonal entry with zero.
- **B.** It exchanges the matrix rows and columns.
- **C.** It guarantees that the matrix has an inverse.
- **D.** It preserves both angle and length for every vector.

Reply with one letter. A hint from the code output: `A = [[1,2],[3,4]]` became `A^T = [[1,3],[2,4]]`.

[11:10] GREG: is there supposed to have been a lesson or document or code or output for me to learn this from before the quiz that im supposed to learn from alongside these quizes and lessons or...

[11:10] CLAUDE: Yes, there was, and that's a gap on my side. The quiz asked about the determinant and the transpose, but I never taught either one before asking.

**What exists for this lesson**, all in `references/ai-engineering-from-scratch/phases/01-math-foundations/02-vectors-matrices-operations/`:
- [docs/en.md](references/ai-engineering-from-scratch/phases/01-math-foundations/02-vectors-matrices-operations/docs/en.md) is the lesson text. It has a **Key Terms** table at the bottom that defines the determinant, transpose and inverse in plain words.
- [code/matrices.py](references/ai-engineering-from-scratch/phases/01-math-foundations/02-vectors-matrices-operations/code/matrices.py) is the code I ran. Its printed output showed `A` next to `A^T` and a determinant of 10.
- The `outputs/` folder has a reusable tutor prompt for matrix operations.
- The lesson file ends with exercises, and the first one is "what happens when the determinant is zero?"

**What I skipped.** The lesson has a "determinant and inverse" part and a "transpose" part. I covered shapes, element-wise versus matrix multiply, broadcasting and the forward pass. I then went to the quiz without explaining the other two ideas, so your "idk" on Question 1 was a fair result.

**The two missing ideas, in plain terms:**
- **Transpose** swaps rows and columns, so row 1 becomes column 1. `[[1,2],[3,4]]` becomes `[[1,3],[2,4]]`. Models use it to run a calculation backwards when they learn.
- **Determinant** is one number that says how […]

[11:12] GREG: b

[11:12] CLAUDE: **B is correct.** The transpose swaps rows and columns.

## Lesson 2 result: 1/2

- You got the matrix shapes, the transpose, and both warm-up recall questions.
- You missed the zero determinant. That was my gap, since I hadn't taught it first.
- It's in your review queue in `LEARNING.md`, and `docs/timeline.md` has the day's entry.

**What you can now do that you couldn't an hour ago:**
- Read `output = activation(weights @ input + bias)` and say what each piece does.
- Check whether two grids can be multiplied by looking at their sizes.

**Next lesson:** Lesson 3, Matrix Transformations. It covers how one grid of numbers can rotate, stretch or flatten a whole set of points, which is the picture behind how a model reshapes its data.

**Next actions**
1. You: say "next lesson" when you're ready. I'll start with 2 recall questions, then teach every concept before any quiz.
2. You (optional): if you'd like a 5-minute refresher on the determinant first, say "refresh determinant".
3. Me: refresh BOULON HQ with today's learning progress. I haven't done it yet, and I'll do it at the end of the next lesson unless you want it now.

[11:14] GREG: next lesson

[11:14] CLAUDE: ## Warm-up recall (no stakes, no score)

**Recall 1.** How is the identity matrix defined?

- **A.** A square matrix that leaves a compatible matrix unchanged when multiplied.
- **B.** A square matrix whose entries are all equal to one.
- **C.** A transposed matrix whose rows and columns are exchanged.
- **D.** A square matrix whose diagonal entries are all distinct.

**Recall 2.** What is the key difference between element-wise multiplication and matrix multiplication?

- **A.** Element-wise applies only to vectors, and matrix multiplication only to matrices.
- **B.** Element-wise uses matching entries, and matrix multiplication uses row-column dot products.
- **C.** Element-wise requires matching inner dimensions, and matrix multiplication requires identical shapes.
- **D.** Element-wise changes shapes, and matrix multiplication always preserves them.

Reply with two letters, or "idk". If you miss one, I'll just explain it.

---

## Lesson 3 preview: Matrix Transformations (~75 min)

The one idea: **a matrix is a machine that moves every point in space.** You can read what it does from where it sends two points, `[1,0]` and `[0,1]`.

The lesson text is in [docs/en.md](references/ai-engineering-from-scratch/phases/01-math-foundations/03-matrix-transformations/docs/en.md). It covers four moves: rotate, stretch, tilt (shear), and mirror (reflect). It also covers *eigenvectors*, the special directions a matrix stretches without turning. Those matter later for compressing data.
 […]

[11:23] GREG: idk and b

[11:23] CLAUDE: **Recall 2: B is correct.** Element-wise multiplies matching entries. Matrix multiplication uses row-by-column dot products.

**Recall 1: A is the answer.** The identity matrix is the "do nothing" matrix: 1s down the diagonal and 0s elsewhere. `[[1,0],[0,1]] @ anything` gives back that same thing, like multiplying a number by 1. In the Lesson 2 output, `A @ A^-1` came out as exactly this matrix.

---

## Lesson 3, part 1: a matrix moves points

Take a point like `(2, 1)`. A 2×2 matrix turns it into a new point. You can read what the matrix does from its **columns**: they show where the two basic arrows `[1,0]` (right) and `[0,1]` (up) end up.

**Stretching (scaling).** The matrix `[[2, 0], [0, 0.5]]` doubles the x-direction and halves the y-direction.

```text
[2   0 ]   [2]   [2·2 + 0·1]   [4  ]
[0  0.5] @ [1] = [0·2 + 0.5·1] = [0.5]
```

So `(2, 1)` moves to `(4, 0.5)`. Think of a photo being stretched wide and squashed short.

**Mirroring (reflecting).** The matrix `[[-1, 0], [0, 1]]` flips x and keeps y, so `(2, 1)` becomes `(-2, 1)`. That's a mirror across the vertical axis.

**Rotating** uses a matrix of sines and cosines, which we'll run in the code. It spins every point around the center without changing any distances.

**Comprehension question.** Apply the stretching matrix `[[3, 0], [0, 1]]` to the point `(2, 5)`. Where does it land?

- **A.** `(6, 5)`
- **B.** `(2, 15)`
- **C.** `(6, 15)`
- **D.** `(5, 2)`

Reply with one letter. Use the pattern above: each row mak […]

[11:37] GREG: a

[11:37] CLAUDE: **A is correct.** `(2, 5)` becomes `(6, 5)`: x is tripled and y stays the same.

## Part 2: combining moves, and order matters

I ran the lesson's code (`transformations.py`). It starts at `(1, 0)` and applies the same two moves in both orders:

- **Rotate 90°, then stretch (2, 0.5):** lands at `(0, 0.5)`.
- **Stretch (2, 0.5), then rotate 90°:** lands at `(0, 2)`.

Same two moves, different results. Turning a car and then driving forward is not the same as driving forward and then turning. In matrix terms, this means `A @ B` is usually not `B @ A`. Combining moves means multiplying the matrices, and the order you multiply in is the order you apply the moves.

**Two other things from the output:**
- **Determinant, reconnected.** Rotation has determinant 1 (the square keeps its area). The mirror had determinant −1 (area kept, but flipped). A determinant of 0 would mean the square gets crushed flat, the "can't undo it" case you missed last time.
- **3D:** rotating `(1,0,0)` by 90° around different axes gives different results. Around the x-axis it doesn't move, because it sits on that axis.

**Comprehension question.** You want to rotate a set of points and then stretch them. Which statement is right?

- **A.** The order doesn't matter, so you can multiply the matrices either way.
- **B.** The order matters, and swapping the matrices can give a different result.
- **C.** The order only matters for 3D, not for 2D.
- **D.** The order only matters if the determinant is negative.

 […]

[11:42] GREG: b

[11:42] CLAUDE: **B is correct.** The order matters in 2D and in 3D, and swapping the matrices can give a different result.

## Part 3: eigenvectors, the directions that survive

Most points change direction when a matrix acts on them. A few special directions don't turn at all; they only get longer or shorter. Those are the **eigenvectors**. The stretch factor along each one is its **eigenvalue**.

**Real output from the code**, for the matrix `[[2,1],[1,2]]`:
- Direction `[0.71, 0.71]` came out as `[2.12, 2.12]`. The direction is the same and the length is 3× longer, so the eigenvalue is **3**.
- Direction `[0.71, -0.71]` came out unchanged, so the eigenvalue is **1**.

The code printed `A @ v` next to `λ × v` and the two matched exactly. That match is the definition of an eigenvector.

**Two more cases from the output:**
- **Plain stretch `[[3,0],[0,5]]`:** the eigenvectors are the two axes, with eigenvalues 3 and 5.
- **Pure rotation by 90°:** no real eigenvectors, since every direction turns. The code reports "complex eigenvalues".

**Why it matters for you** (from the lesson's "Why eigenvalues matter" section):
- **Compressing data (PCA):** the eigenvectors with the biggest eigenvalues are the directions where the data varies most. Keep those few and drop the rest.
- **Stability:** if an eigenvalue is above 1, repeated steps blow numbers up. Below 1, they fade to zero. That is the "exploding or vanishing" problem in training.

**Comprehension question.** A matrix stretches the directio […]

[11:47] GREG: a

[11:47] CLAUDE: **A is correct.** `[1, 1]` only got longer (×4) and didn't turn, so it's an eigenvector with eigenvalue 4.

## Quiz: 3 questions, no hints

Each one was covered above.

**Question 1 of 3.** Why does the order of matrix transformations matter? (Why is `R @ S` different from `S @ R`?)

- **A.** One order produces a larger matrix than the other.
- **B.** The determinants are different for each order.
- **C.** Matrix multiplication is not commutative: rotating then scaling gives a different result than scaling then rotating.
- **D.** Matrix addition is not commutative.

Reply with one letter.

[11:49] GREG: c

[11:49] CLAUDE: **C is correct (1/1).** Matrix multiplication isn't commutative. Rotate-then-stretch landed at `(0, 0.5)` and stretch-then-rotate at `(0, 2)`. (The determinants do match for both orders, so B was a trap.)

**Question 2 of 3.** In a recurrent neural network, what happens when the weight matrix has eigenvalues with magnitude greater than 1?

- **A.** The eigenvalues converge to 1 over training.
- **B.** The network becomes more stable.
- **C.** Outputs explode exponentially over time steps (the exploding gradient problem).
- **D.** The network learns faster.

Reply with one letter.

[11:50] GREG: c

[11:50] CLAUDE: **C is correct (2/2).** Each time step multiplies by the matrix again, so anything stretched by more than 1 grows exponentially. Below 1, it fades toward 0 instead.

**Question 3 of 3.** The matrix `A = [[2, 1], [1, 2]]` has eigenvalues 3 and 1. What does the eigendecomposition `A = V @ D @ V^(-1)` reveal?

- **A.** A has rank 1 and maps all vectors to a line.
- **B.** A is equivalent to two rotations.
- **C.** A compresses all vectors by a factor of 2.
- **D.** A stretches space by 3× along the `[1,1]` direction and leaves the `[1,-1]` direction unchanged.

Reply with one letter. The code output from part 3 has the answer's ingredients.

[11:53] GREG: idk

[11:53] CLAUDE: **D is the answer.** Eigendecomposition splits a matrix into three steps: switch to the special directions, stretch each one by its eigenvalue, switch back. For this matrix, the code showed that `[1,1]` is stretched 3× and `[1,-1]` is left unchanged (eigenvalue 1). Every other direction is a mix of those two.

## Lesson 3 result: 2/3

- **Got right:** order matters, and eigenvalues above 1 make a network explode.
- **Missed:** the identity matrix in the warm-up, and eigendecomposition in the quiz. Both are in your review queue in `LEARNING.md`.
- **Phase 1 progress:** 3 of 22 lessons done.
- **Timeline:** `docs/timeline.md` has the day's entry.

**What you can now do:** look at a matrix and say whether it rotates, stretches, tilts or mirrors, and whether swapping the order of two moves changes the result.

**Next lesson:** Lesson 4, Calculus for ML. It covers how a model measures "which way is downhill" on its error, which is how training finds better settings.

**Next actions**
1. You: say "next lesson" to continue. I'll teach each concept before the quiz.
2. You (optional): say "quiz me on the review queue" and I'll test you on the missed items.
3. Me: I still owe the BOULON HQ refresh with today's learning progress. I'll run it at your next pause unless you'd rather have it now.

[11:56] GREG: quiz on the review queue

[11:56] CLAUDE: ## Review-queue quiz: 4 questions, no stakes

These cover what you missed, one at a time. I'll explain after each answer.

**Question 1 of 4: the determinant.** A matrix has determinant 0. What does that tell you?

- **A.** It flips everything upside down but can be undone.
- **B.** It crushes space flat, so the original points can't be recovered and there is no inverse.
- **C.** It leaves every point exactly where it was.
- **D.** It doubles the area of every shape.

Reply with one letter. "idk" is fine.

[11:56] GREG: b

[11:56] CLAUDE: **B is correct.** Determinant 0 means the matrix flattens space. Two different points can land on the same spot, so there's no way to go back. A is the determinant −1 case (a mirror), and C describes the identity matrix.

**Question 2 of 4: the identity matrix.** You multiply any grid `M` by the identity matrix `I`. What do you get?

- **A.** A grid of all zeros.
- **B.** `M` transposed.
- **C.** `M`, unchanged.
- **D.** `M` with every number doubled.

Reply with one letter.

[11:57] GREG: couldnt you build a nice interactive cheat sheet with matrix concepts as if you were my acutal tutor? eac time we learn something or a visual connectio nwe can use we add it?

[11:57] GREG: Base directory for this skill: C:\Users\rilg01\.claude\skills\attention-architecture

# Attention Architecture — word bank and how to apply it

Treat the viewer's attention as a budget. Every element must earn its place.

## Core disciplines
- **Neuro-design:** design for how the brain actually perceives and processes information.
- **Attention economy design:** attention is scarce; spend it only on what moves the story.
- **Cognitive psychology:** the study of perception, memory and filtering. Design for what people will remember, not just what they see.
- **Neuromarketing:** use known emotional and sensory response patterns: urgency, relief, trust signals.
- **HCI (human–computer interaction):** controls look clickable, feedback is immediate, and nothing surprises the user.

## Visual ingestion and eye movement
- **Visual saliency:** colour, contrast, size and orientation decide what's seen first. Spend saliency on one target per view.
- **Foveation:** the eye focuses sharply on one small point. Put the key number or claim where the eye lands, not spread around it.
- **Gaze cueing:** arrows, lines, pointing sketches and motion direction lead the eye to the next thing.
- **Predictive eye tracking:** before publishing, walk the page and ask where the eye lands first, second and third. Fix it if the answer isn't the intended order.
- **Saccadic suppression:** the eye goes briefly blind while it jumps. Avoid important changes mid-transition, and let slide/scene changes settle before showing key content.
- **Time-to-first-fixation (TTFF):** how quickly the eye lands on the target. The ask or decision should be found within about 1 second.

## Layout and contrast
- **Visual hierarchy:** size, weight, colour, then position. One headline per section.
- **Visual contrast dynamics:** light vs dark, big vs small, dense vs empty. Whitespace isolates the hero.
- **Visual attention optimization (VAO):** check each section for one job, one focal point and one takeaway.
- **Isolation effect (Von Restorff):** the one thing that differs gets remembered. Only the recommended option or the ask gets the brand colour and glow.
- **Micro-clutter:** strip decorative borders, extra icons, redundant labels and extra font weights.

## Mental resources
- **Attention budget:** each animation, font and colour costs attention. Use at most 1 accent colour and 2 typefaces (plus a handwriting face for annotations), and animate only what carries meaning.
- **Cognitive load theory:** reduce extraneous load (layout noise) so the intrinsic load (the content) fits. Chunk long content into 3–5 item groups.
- **Attentional capture:** use sparingly, for the single thing that must not be missed (a pulsing decision chip).
- **Exogenous vs endogenous attention:** exogenous is bottom-up, grabbed by a red flash or motion; use it for the ask. Endogenous is top-down, when the reader is looking for something; support it with clear headings and scannable labels.
- **Inattentional blindness:** if focus is locked on one place, other things go unseen. Never hide a critical caveat next to a strong focal point; give it its own beat.
- **Sensory overload threshold:** too much motion or density and people skip the page. Stagger motion, keep it under about 1.5 s, and always respect reduced-motion settings.

## Added concepts (Claude, 2026-09-23)
- **Pre-attentive attributes:** the eye processes colour, size, motion and position in under ~250 ms. Encode status with these, not with text alone.
- **Gestalt principles:** proximity, similarity, continuity and closure group things without borders.
- **F / Z reading patterns:** text-heavy pages are read in an F shape, sparse ones in a Z. Put the ask on the path.
- **Serial position effect:** first and last items are remembered best. State the ask at the start and again at the end.
- **Peak-end rule:** people judge an experience by its best moment and its ending. Build one "wow" proof moment, and end on a clear, easy next step.
- **Progressive disclosure:** summary first, details on demand (drill-downs, expanders).
- **Hick's law:** more choices means a slower decision. At most 3 options, one recommended.
- **Fitts's law:** primary actions are big and easy to reach.
- **Chunking (Miller):** group items in 3–5.
- **Dual coding:** a picture plus words is remembered better than either alone. Pair each key claim with a simple visual (whiteboard sketch, bar, icon).
- **Goal-gradient and Zeigarnik effects:** progress bars and unticked items pull people toward finishing.
- **Narrative transportation:** a before → struggle → turning point → result story holds attention longer than a list of facts.
- **Signal-to-noise ratio:** every pixel either carries the message or gets removed.

## Checklist before publishing any visual
1. Where does the eye land first? It should be the headline or the ask.
2. Is there one focal point per section, and only one thing isolated in the accent colour?
3. Is the ask at both the start and the end?
4. Is motion purposeful, staggered, under ~1.5 s, and off under reduced motion?
5. Any micro-clutter left to strip?
6. Is it a story (then → turning point → now → next), not a list?

## Motion patterns Greg approved (2026-09-23, BOULON request v4)
- **Deck cards + living connectors:** each chapter is a clearly separated card. Between cards, a thin line with a data pulse flowing down it, and a small branded node with an icon that breathes, or fills once like a "download" ring, when it appears.
- **Scroll reveal, never static:** cards rise 24px and scale from .985 on entering view, children staggered 60–90 ms. It plays once. Content stays readable at rest (never opacity 0), and everything is final under reduced motion.
- **Timelines move:** the progress line fills, dots pop in sequence, the key node breathes, a handwritten "Turning point" callout with an arrow points at it (gaze cueing + Von Restorff), and future nodes show a dashed or shimmer "loading" state.
- **Story chat scenes:** the user message "sends" (slide + tick), a typing indicator shows for about 1 s, then the answer parts appear one by one in hierarchy order. It plays once and stays loaded.
- **Progress rails:** SaaS style: charcoal track, brand-gradient fill that grows on reveal, slow shimmer, and rings that fill when the rail reaches them.
- **Info cards:** a 2×2 grid, each with an icon tile, a bold 3–5 word title and one short line, equal heights, and an accent that draws in.
- **Numbers:** count-ups and bars trigger on reveal, not on page load.
- **Every stop-and-read spot** needs one focal point with a motion or contrast cue. A small dot alone isn't enough.

[12:01] CLAUDE: Published. I'm now wiring the sheet into `CLAUDE.md` and memory so it gets updated after every lesson.

[12:02] CLAUDE: Yes, I built it: **[Matrix Cheat Sheet](https://claude.ai/artifact/RMu8SNfCmFA5qRf4gZgYvi)**. The link is private to your account. I haven't opened the page in a browser. I only syntax-checked its code, so tell me if anything looks broken or doesn't respond.

**What's on it (all from Lessons 1–3):**
- **Dot product:** move four sliders and watch the dot product, cosine and angle change, with a verdict chip like "Unrelated (right angle)". It has presets for your quiz question.
- **Shapes:** type any two grid sizes and it tells you whether they multiply and what size the result is. It starts on the 3×5 @ 5×2 question you answered.
- **Moves and eigenvectors:** four sliders for a 2×2 matrix, plus preset buttons. It shows the square before and after, the determinant, and the eigenvectors as dashed lines with their stretch factors. The "Crush flat" preset shows determinant 0 and the "no inverse" chip. "Stretch + mix" shows the 3× and 1× directions you missed.
- **Order matters:** pick any two moves and a start point, and it shows both orders side by side.
- **Identity and transpose:** an editable grid that flips live.
- **One layer of a network:** the line `weights @ input + bias` taken apart.
- **Review queue:** your four missed items with a plain explanation of each. Tap a status to cycle it between "Still shaky", "Getting there" and "Got it". The status is saved in your browser only, so I can't see it.

Every card has a handwritten tutor note and a "In BOULON" line tying it to  […]

[12:09] GREG: i was thinking of a much more uni tutor beginner friendly type of cheat sheet. like every concept, operation, variable, shown clearly in diagram examples and simple matrix demonstrations, like an exam cheat sheet. really form the start. like the transpose variable, with what it looks like on a test matrix, simple operations, etc, then blown out and expanded for more complicated subjects

[12:11] CLAUDE: Got it. You want a proper exam-style reference built from the very first symbol up, not a playground. I'm rebuilding the sheet that way: every term, symbol and operation gets a definition, a rule, a worked example on test matrices, a common mistake and an AI link. Then it expands to the harder topics. I'll publish it to the same link.

[12:14] CLAUDE: You're right, and the new version fixes that: it has the identity matrix under "Special matrices" and "Identity in action", each with a worked example. I'm checking the page and publishing it now.

[12:15] CLAUDE: All 29 worked examples compute without errors, including the edge cases: a zero determinant, an all-zero matrix and a rotation matrix. Publishing now.

[12:15] CLAUDE: I rebuilt the sheet as an exam-style reference and published it over the same link: **[Matrix Cheat Sheet](https://claude.ai/artifact/RMu8SNfCmFA5qRf4gZgYvi)** (version 2). I haven't looked at it in a browser. I ran all 29 worked examples through a script, including the singular and rotation edge cases, and none errored. Tell me if anything looks wrong on screen.

**Your A (all zeros) was a reasonable guess given the old sheet.** The identity matrix barely appeared there, so you had nothing to work from. The answer is **C: you get `M` back, unchanged.**

Here it is with real numbers, and it's also on the new sheet:

```text
[1 0]   [5 6]   [1·5+0·7   1·6+0·8]   [5 6]
[0 1] @ [7 8] = [0·5+1·7   0·6+1·8] = [7 8]
```

The identity has 1s on the diagonal and 0s elsewhere. Each row of `I` picks out exactly one row of `M` and ignores the rest, so nothing changes. It's the matrix version of multiplying a number by 1.

**How the sheet is laid out now:**
- **Contents on the left:** you can jump to any entry.
- **Your test data at the top:** change any number in A, B, C, u or v and every example recomputes. There's a "Try random numbers" button.
- **Symbol decoder:** every symbol on the sheet in one table, with a worked value from your data.
- **29 entries in the same layout:** each has a definition, the rule, a worked example on your matrices, a "Common mistake" line and an "In AI" line. Where it helps, there's a diagram.
- **Part 0, notation:** scalar, vector and matrix; entry `A_ij` […]

[13:07] GREG: so the answer is c m unchanged

[13:07] CLAUDE: Yes, **C: `M`, unchanged.** Multiplying by the identity matrix returns the same matrix, like multiplying a number by 1. That makes two of the four review items done: determinant (you got it) and identity.

## Review question 3 of 4: eigendecomposition

The refresher is on the sheet under **Part 4 → Eigenvalues and eigenvectors**, then **Eigendecomposition**. The short version:

- An **eigenvector** is a direction that a matrix only stretches and never turns. Its **eigenvalue** is how much it stretches.
- **Eigendecomposition** splits a matrix into three steps: switch to those special directions, stretch each by its eigenvalue, switch back.

Take the sheet's start matrix `A = [[2, 1], [1, 2]]`. It has two special directions: `[1, 1]` with eigenvalue **3**, and `[1, -1]` with eigenvalue **1**.

**Question.** What does that tell you the matrix does?

- **A.** It stretches space 3× along `[1, 1]` and leaves `[1, -1]` unchanged.
- **B.** It rotates everything by 3 degrees.
- **C.** It shrinks everything by a factor of 3.
- **D.** It flattens space onto a line.

Reply with one letter. "idk" is fine. If you want to see it first, scroll to the eigenvalue example on the sheet and look at the dashed lines.

[13:16] GREG: idont even get the explanation from the cheat sheet. idk

[13:16] CLAUDE: That's fair feedback, and it's on me: the sheet jumps straight to the formula. I'll build the idea from scratch with numbers you can check by hand.

## Eigenvectors in 3 steps

**Step 1: a matrix moves arrows.** Take the simple matrix `M = [[3, 0], [0, 1]]`. It triples the x part and leaves the y part alone. You apply it the way you did in Lesson 3: each row makes one new number.

**Step 2: watch three arrows go through it.**

```text
arrow [1, 0] → [3·1 + 0·0, 0·1 + 1·0] = [3, 0]   same direction, 3× longer
arrow [0, 1] → [3·0 + 0·1, 0·0 + 1·1] = [0, 1]   same direction, same length
arrow [1, 1] → [3·1 + 0·1, 0·1 + 1·1] = [3, 1]   the direction changed
```

Two of the three arrows kept their direction. The matrix only made `[1, 0]` longer and left `[0, 1]` the same length.

**Step 3: the names.** An arrow that keeps its direction is an **eigenvector** ("eigen" is German for "own", the matrix's own directions). The factor it gets stretched by is its **eigenvalue**:
- `[1, 0]` is an eigenvector with eigenvalue **3**.
- `[0, 1]` is an eigenvector with eigenvalue **1**.
- `[1, 1]` is not an eigenvector, because it got turned.

That's the whole idea. For fancier matrices like `[[2, 1], [1, 2]]` the special arrows aren't the obvious axes. They're `[1, 1]` and `[1, -1]`, but the idea is the same.

**Check question (easy).** With `M = [[3, 0], [0, 1]]`, the arrow `[1, 1]` became `[3, 1]`. Is `[1, 1]` an eigenvector of M?

- **A.** Yes, because it still points the same way.
- **B.**  […]

[13:19] GREG: a

[13:19] CLAUDE: **It's B, and the mix-up is common.** You saw that the arrow got longer, but the test is whether it still points along the same line.

- `[1, 1]` has equal x and y, so it points up and right at 45°.
- `[3, 1]` has x three times bigger than y, so it points mostly right.

To keep its direction, `[1, 1]` would have to become some number `k` times itself: `[k, k]`. But it became `[3, 1]`, and 3 and 1 are not equal, so no single `k` works. The matrix tripled x but not y, which tilted the arrow. That's why `[1, 1]` is not an eigenvector.

**Try one more.** Same `M = [[3, 0], [0, 1]]`, new arrow `[2, 0]`:

```text
[2, 0] → [3·2 + 0·0, 0·2 + 1·0] = [6, 0]
```

Is `[2, 0]` an eigenvector of M? Test it the same way: is `[6, 0]` just some number times `[2, 0]`?

- **A.** Yes, `[6, 0]` is 3 × `[2, 0]`, so it's an eigenvector with eigenvalue 3.
- **B.** No, its direction changed.

Reply with A or B.

[13:20] GREG: a

[13:20] CLAUDE: **A is correct.** `[6, 0]` is 3 × `[2, 0]`, so the direction held and the eigenvalue is 3. The length of the arrow doesn't matter, only that it stays on the same line.

## Back to review question 3

Now you have the tools. Here is the matrix `A = [[2, 1], [1, 2]]` applied to two arrows, with the arithmetic shown:

```text
[1,  1] → [2·1 + 1·1,  1·1 + 2·1] = [3, 3]    = 3 × [1, 1]
[1, -1] → [2·1 + 1·(-1), 1·1 + 2·(-1)] = [1, -1] = 1 × [1, -1]
```

Both arrows kept their direction, so both are eigenvectors. Their eigenvalues are 3 and 1.

**Question.** What does that tell you the matrix `A` does?

- **A.** It stretches space 3× along `[1, 1]` and leaves `[1, -1]` unchanged.
- **B.** It rotates everything by 3 degrees.
- **C.** It shrinks everything by a factor of 3.
- **D.** It flattens space onto a line.

Reply with one letter. Use the two results above.

[13:22] GREG: a

[13:22] CLAUDE: **A is correct.** The matrix stretches 3× along `[1, 1]` and leaves `[1, -1]` alone. That's eigendecomposition, and you worked it out from the arithmetic.

## Review question 4 of 4: LoRA

LoRA is the "fine-tune a model cheaply" trick from Lesson 1. It needs one idea first.

**Idea: a big grid can be built from two thin ones.** Multiply a tall thin grid by a short wide grid:

```text
[1]             [1·1  1·2]   [1 2]
[2] @ [1  2] =  [2·1  2·2] = [2 4]
(2×1)  (1×2)       (2×2)
```

The 2×2 result has 4 numbers, but you only needed 2 + 2 = 4 inputs here. At bigger sizes the saving is huge. A matrix that can be built this way is called **low rank**. That's the rank idea from the sheet: few independent directions.

**How LoRA uses it.** A model has a weight matrix of 1000 × 1000, which is 1,000,000 numbers. Retraining all of them is expensive. LoRA leaves that matrix frozen and learns only the *change* to it, written as a (1000 × 8) matrix times an (8 × 1000) matrix.

**Question.** Roughly how many numbers does LoRA train for that one weight matrix? (Count the numbers in both thin matrices.)

- **A.** 1,000,000
- **B.** 16,000
- **C.** 8
- **D.** 8,000,000

Reply with one letter. Hint: 1000 × 8 for the first matrix, plus the same for the second.

[13:24] GREG: b

[13:24] CLAUDE: **B is correct.** (1000 × 8) + (8 × 1000) = 16,000 numbers, instead of 1,000,000. That's why LoRA is cheap.

## Review quiz done: 4 out of 4

You got all four this time, though three of them needed a proper explanation first, and that's fine. I'm now logging it and adding the step-by-step explanations I used to the sheet: eigenvectors from scratch, and low-rank/LoRA.

[13:26] GREG: Base directory for this skill: C:\TRANSDEV HUB\.claude\skills\boulon-hq-update

# Refresh BOULON HQ after every exchange

BOULON HQ (https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9) is Greg's **only** daily view. It replaced TODAY.md on 2026-09-23. Design goal: engaging and low-clutter. One action in focus, progress visible, finished items gone.

1. Edit only the `const S = {...}` block in `C:\TRANSDEV HUB\boulon-hq.html`:
   - `updated`: the current time.
   - `headline`: one sentence saying where we stand now.
   - `progress`: done/total for the current step.
   - `move`: the **single** next thing Greg does, in full `boulon-greg-steps` format. If Greg has nothing to do, say so and show what Claude is doing.
   - `decisions`: states are good (decided), warn (open), bad (blocked). Remove a decision one exchange after it's decided, once it's logged.
   - `tiles` / `tests`: latest scores. The pass rule: the answer is right AND the citation names the manual.
   - `later`: at most 7 rows, relative times. Drop anything done.
   - `feed`: newest first, at most 5 items. Name the ECC agents and skills actually used. This is how Greg sees ECC at work.
2. Republish with the Artifact tool. In the session that first published it, use the same file path; in ANY other session (terminal, new chat), pass `url: https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9`, or you'll create a duplicate page. Read it first (`action: read`) if this session hasn't published it. No icon.
   - The same file also feeds the local **Control room** (http://127.0.0.1:4777, `hq/server.js` + `hq/hq-local.js`, see `docs/hq-control-room.md`). Don't edit the Control room from here. It reads live numbers itself, and it never appears on the published page. Keep `boulon-hq.html`'s `#v-now` element and CSS tokens: the panel depends on them.
3. Mirror durable facts, such as decisions and results, into `docs/continuity-log.md` and the continuity log doc (see memory `live-log-doc`).
4. Plain language, no emoji, and no ECC tool pre-assigned to future slots.

[13:27] CLAUDE: The published HQ page is still the Oct 7 version, and my local file is newer (Oct 15) plus today's learning entry. I'm publishing the local file to the same HQ link.

[13:27] CLAUDE: The review queue is cleared and the sheet and BOULON HQ are both updated.

**Review quiz result: 4/4**, though each one needed a re-teach first:
- **Determinant 0:** crushes space flat, so there's no inverse.
- **Identity:** multiplying by it leaves a matrix unchanged.
- **Eigenvectors and eigendecomposition:** you needed two extra checks. You first mixed up "got longer" with "kept its direction", then got it right. Then you answered the `[[2,1],[1,2]]` question correctly.
- **LoRA:** two thin matrices train 16,000 numbers instead of 1,000,000.

I also did the following:
- **Cheat sheet (v3):** I added "Eigenvectors, step by step", which pushes arrows through a matrix and tests whether each stays on its line. I also added "Low rank and LoRA" with the 16,000 versus 1,000,000 count. Both use your test data, and all 31 examples ran clean in my check.
- **Logs:** `LEARNING.md` has the review result and a cleared queue (re-test in a week). `docs/timeline.md` has today's entry.
- **BOULON HQ:** I added one learning line to the feed and updated the timestamp. The published HQ page was still the Oct 7 version, so this publish also brought it up to the Oct 15 content. The BOULON items on it (the brands question, ticket 77048) are unchanged from Thursday, so check them yourself if anything moved over the weekend.
- **Not done:** I didn't copy today's work into the continuity log doc, and I haven't opened either page in a browser.

**Next actions**
1. You: say "next lesson" for Lesson 4 […]

[13:28] GREG: next lesson

[13:29] CLAUDE: ## Warm-up recall (no stakes)

**Recall 1.** What is an eigenvector of a matrix?

- **A.** A vector that the matrix only scales and never rotates
- **B.** The diagonal entries of the matrix, written as a vector
- **C.** The largest row in the matrix
- **D.** A vector perpendicular to all columns of the matrix

**Recall 2.** What does the determinant of a 2D transformation matrix represent geometrically?

- **A.** The number of eigenvectors the matrix has
- **B.** The angle of rotation the matrix applies
- **C.** The factor by which the matrix scales area
- **D.** The trace of the matrix

Reply with two letters, like "X, Y". "idk" is fine.

---

## Lesson 4 preview: Calculus for ML (~60 min)

The lesson text is in [docs/en.md](references/ai-engineering-from-scratch/phases/01-math-foundations/04-calculus-for-ml/docs/en.md). It's the first lesson with no matrices at the start. The one idea:

> A model has millions of settings (weights). Calculus tells you, for each one, **which way to turn it** to make the model a bit less wrong.

That's how every model learns, including the one behind your BOULON agent. I'll teach every term before I ask about it, and the Key Terms are at the bottom of the lesson file. The words you'll meet are *derivative* (the slope), *gradient* (all the slopes together), *gradient descent* (walking downhill) and *learning rate* (the step size).

Answer the two recall questions first, then we start with the slope.

[13:32] GREG: a c

[13:32] CLAUDE: **Both correct.** An eigenvector is a direction the matrix only scales (A), and the determinant is the factor by which it scales area (C).

---

## Lesson 4, part 1: the slope (derivative)

Picture a bowl and a marble sitting on its side. The **derivative** is the **slope** at the marble's spot: how steeply the ground tilts there.

Use the function `f(x) = x²` (the bowl). Here are three spots:

```text
x = 3   height f = 9   slope = 6    ground tilts up to the right, steeply
x = 1   height f = 1   slope = 2    ground tilts up to the right, gently
x = 0   height f = 0   slope = 0    flat: the bottom of the bowl
x = -2  height f = 4   slope = -4   ground tilts DOWN to the right
```

Those slopes come from a rule you can just use: for `x²`, the slope at any `x` is `2x`.

**You can also check a slope with plain arithmetic.** Nudge x from 3 to 3.01 and see how much the height rises:

```text
f(3)    = 9
f(3.01) = 9.0601
rise = 0.0601 over a step of 0.01  →  slope ≈ 6.01   (matches 6)
```

**How to read the sign:**
- **Positive slope:** the height goes up as x increases. Walking right goes uphill.
- **Negative slope:** the height goes down as x increases. Walking right goes downhill.
- **Zero slope:** flat. You're at a bottom (or a top).

**Comprehension question.** You're at `x = 3` on the bowl `f(x) = x²`, where the slope is **+6**. You want to get **lower** (make `f` smaller). Which way do you move x?

- **A.** Increase x (move right).
- **B.** Decrease x (move left).
- **C.** D […]

[13:34] GREG: b

[13:35] CLAUDE: **B is correct.** The slope is positive, so the height rises as you go right. To get lower, move left, which means decreasing x. Moving *against* the slope is the whole idea of learning.

## Part 2: the learning step (gradient descent)

Turn that rule into one line:

```text
new x = old x − (learning rate) × slope
```

The **learning rate** is the step size you choose. Here is the lesson's code, run on the bowl `f(x) = x²`. It starts at `x = 5` with learning rate 0.1:

```text
x = 5     slope = 2×5 = 10    new x = 5 − 0.1×10 = 4.0
x = 4     slope = 8           new x = 4 − 0.1×8  = 3.2
...
step 4    x = 1.64   height 2.68
step 12   x = 0.27   height 0.076
step 19   x = 0.058  height 0.003
```

It rolled toward x = 0, the bottom, taking smaller steps as the slope flattened. That is **gradient descent**: slope, step against it, repeat.

**Two more results from the output:**
- **Several knobs at once:** for `x² + y²` starting at `(4, 3)`, the code moved both numbers together and ended near `(0.005, 0.004)`. The list of slopes for all the knobs is called the **gradient**. A model does exactly this with millions of weights.
- **Slopes can be checked by arithmetic:** the "numerical" and "analytical" slopes matched to 8 decimal places.

**Comprehension question.** Using the update rule, you're at `x = 4` where the slope is `8`. The learning rate is `0.1`. What is the new x?

- **A.** 3.2
- **B.** 4.8
- **C.** 0.8
- **D.** 12

Reply with one letter. Plug the numbers into `new x = old  […]

[13:39] GREG: a

[13:39] CLAUDE: **A is correct.** 4 − 0.1×8 = 3.2. That's one step downhill.

## Part 3: checking a slope, and the learning-rate trap

**Checking a slope with arithmetic (central difference).** You don't always have a formula for the slope. You can measure it by stepping a tiny amount to *both* sides and dividing:

```text
slope ≈ ( f(x + h) − f(x − h) ) / (2h)
```

For `f(x) = x²` at `x = 3` with a small step `h = 0.1`:

```text
f(3.1) = 9.61     f(2.9) = 8.41
slope ≈ (9.61 − 8.41) / (2 × 0.1) = 1.2 / 0.2 = 6
```

That matches the real slope of 6. Looking at both sides makes it more accurate than a one-sided check. The lesson's code uses this to confirm its formulas.

**The learning-rate trap.** The step size matters. On the bowl `f(x) = x²` the update is `new x = x − rate × 2x`:

```text
rate 0.1:  5 → 4 → 3.2 → 2.56 ...     shrinks toward 0: good
rate 1.1:  5 → −6 → 7.2 → −8.64 ...   jumps over the bottom, each swing bigger: it blows up
rate 0.001: 5 → 4.99 → 4.98 ...        goes the right way but crawls
```

Too big overshoots and diverges, and too small takes forever. Choosing the learning rate is one of the first settings people tune.

**Comprehension question.** Using the central difference on `f(x) = x²` at `x = 3` with `h = 0.1`, `f(3.1) = 9.61` and `f(2.9) = 8.41`. What slope do you get?

- **A.** 6
- **B.** 0.6
- **C.** 12
- **D.** 1.2

Reply with one letter. Plug in: (9.61 − 8.41) ÷ (2 × 0.1).

**Next actions**
1. You: answer A, B, C or D.
2. Me: part 4, the Hessian and why Newto […]

[13:47] GREG: a

[13:47] CLAUDE: **A is correct.** The central difference gives (9.61 − 8.41) ÷ 0.2 = 6.

## Part 4: curvature, the Hessian, and why models don't use it

So far you used only the **slope**, which says which way is downhill. There is a second piece of information: the **curvature**, which says how sharply the ground bends. For the bowl `x²`, the slope changes by 2 every time x moves by 1, so the curvature is always 2.

**Newton's method** uses both. The step is `new x = x − slope ÷ curvature`. Starting at `x = 5`:

```text
slope = 10, curvature = 2
new x = 5 − 10/2 = 0        the exact bottom, in ONE step
```

Plain gradient descent needed about 20 steps for the same bowl. Knowing the curvature lets you jump straight to the bottom.

**The Hessian** is the curvature for a model with many weights. With one weight there's one curvature number. With N weights you need a curvature for every *pair* of weights, so it's an **N × N grid**. From the lesson:

```text
2 weights  → 2 × 2 grid → 4 numbers
```

**Why this breaks down.** The Hessian has N × N entries, and working with it takes even more effort than storing it. A model with 1,000,000 weights would need a grid of 1,000,000 × 1,000,000 = a trillion numbers. That's far beyond any computer's memory. So models use the cheap slope-only method (with clever tweaks), and Newton's method stays a tool for small problems.

**Comprehension question.** A model has 1,000 weights. How many numbers are in its Hessian grid?

- **A.** 1,000
- **B.** 2,000
- **C. […]

[13:49] GREG: c

[13:49] CLAUDE: **C is correct.** 1,000 × 1,000 = 1,000,000. At 1,000,000 weights it becomes 1,000,000,000,000, which is why this doesn't scale.

## Quiz: 3 questions, no hints

Each one was covered above.

**Question 1 of 3.** In gradient descent, what does the update rule `w = w − lr × dL/dw` accomplish? (`w` is a weight, `lr` is the learning rate, `dL/dw` is the slope of the error, called the loss L, with respect to that weight.)

- **A.** It normalizes the weight to have magnitude 1.
- **B.** It increases the loss to test model robustness.
- **C.** It resets the weight to its initial value minus the gradient.
- **D.** It adjusts each weight in the direction that reduces the loss, scaled by the learning rate.

Reply with one letter.

[13:49] GREG: d

[13:49] CLAUDE: **D is correct (1/1).** It nudges each weight against its slope, by an amount set by the learning rate.

**Question 2 of 3.** Why can't Newton's method, which uses the Hessian matrix, be applied directly to neural networks with millions of parameters?

- **A.** Newton's method converges too slowly for deep networks.
- **B.** The Hessian is an N × N matrix, needing about N² storage and about N³ work per step, which is impossible for millions of parameters.
- **C.** Newton's method needs formulas for the slopes, which can't be computed for neural networks.
- **D.** Newton's method only works for convex functions.

Reply with one letter.

[13:50] GREG: b

[13:50] CLAUDE: **B is correct (2/2).** The Hessian is N × N, so it's about N² numbers to store and even more work to use. C is wrong because slopes of networks can be computed exactly (that's what the next lessons cover).

**Question 3 of 3.** What is the numerical (central difference) approximation for the slope f′(x)?

- **A.** (f(x+h) − f(x)) / h
- **B.** f(x) × h
- **C.** (f(x+h) − f(x−h)) / (2h)
- **D.** f(x+h) / h

Reply with one letter.

[13:50] GREG: c

[13:51] CLAUDE: **C is correct (3/3).** The central difference looks at both sides: (f(x+h) − f(x−h)) / 2h.

## Lesson 4 result: 3/3

I'm now logging it and adding a "Calculus" part to the cheat sheet, with interactive examples.

[13:52] CLAUDE: Nothing was applied, because the shell rejected my command. I'll put the edit script in a file and run that instead.

[13:54] CLAUDE: All 36 examples run clean, including the blow-up case (rate 1.1) and the one-million-weight case. Publishing.

[13:55] CLAUDE: ## Lesson 4 result: 3/3

You got the update rule, Newton and the Hessian, and the central difference. Phase 1 progress: 4 of 22 lessons.

**What you can now explain:**
- Training a model means: work out the slope for every weight, then nudge each one against its slope by a step set by the learning rate.
- A learning rate that's too big blows up, and one that's too small crawls.
- Newton's method is too big for real models. A million weights would need a grid of a trillion numbers.

**Cheat sheet, version 4:** it has a new "Part 5 · Calculus: slopes and learning" with five entries:
- **Slope:** a slider for x, showing the slope and which way is downhill.
- **Checking a slope:** buttons for the step size, comparing the one-sided and both-sided checks.
- **Gradient:** your `u` as a point, with one step downhill computed.
- **Gradient descent:** sliders for the start and the learning rate, with a 10-step table. Try rate 1.1 to see it blow up.
- **Hessian and Newton:** buttons for the number of weights, showing the grid size in bytes.

I also added the symbols `f′(x)`, `∂f/∂x`, `∇f` and `H` to the decoder, and moved Calculus out of "Coming up" (now Part 6). The sheet is at https://claude.ai/artifact/RMu8SNfCmFA5qRf4gZgYvi, and I haven't looked at it in a browser. I ran all 36 examples through a script, including the blow-up case, and none errored. `LEARNING.md` and `docs/timeline.md` are both updated. The first draft of my edit command failed with a shell error, and I redid it fro […]

[13:56] GREG: next lesson

[13:57] CLAUDE: ## Warm-up recall (no stakes)

**Recall 1.** What does the derivative of a function at a point tell you?

- **A.** The maximum value the function can reach
- **B.** The area under the function up to that point
- **C.** The rate of change (the slope) of the function at that point
- **D.** The value of the function at that point

**Recall 2.** What is a gradient in machine learning?

- **A.** The difference between predicted and actual values
- **B.** A measure of model accuracy
- **C.** A list of all the partial slopes, pointing in the direction of steepest ascent (uphill)
- **D.** The learning rate used during training

Reply with two letters, like "X, Y", or "idk".

---

## Lesson 5 preview: Chain Rule and Autodiff (~90 min)

The lesson text is in [docs/en.md](references/ai-engineering-from-scratch/phases/01-math-foundations/05-chain-rule-and-autodiff/docs/en.md).

**The problem.** Last lesson, you learned that training needs the slope of the error for every weight. But a real model is dozens of steps chained together: input → layer → activation → layer → … → error. Working out those slopes by hand would be impossible.

**The idea in one picture.** Think of a row of gears. If gear A turns gear B twice as fast, and B turns C three times as fast, then A turns C **2 × 3 = 6** times as fast. You multiply the ratios along the chain. That is the **chain rule**, and the algorithm that applies it automatically through a whole model is **autodiff** (automatic differentiation). It's w […]

[13:58] GREG: c c

[13:58] CLAUDE: **Both correct.** The derivative is the slope (C), and the gradient is the list of partial slopes pointing uphill (C).

## Part 1: the chain rule (the gears)

If gear A turns B twice as fast and B turns C three times as fast, A turns C 2 × 3 = 6 times as fast. **Multiply the rates along the chain.**

In maths: when one function feeds into another, the overall slope is the **product of the slopes of each link.**

**Worked example.** `y = (3x + 1)²`. Two links:

```text
link 1:  u = 3x + 1     slope of u with respect to x:  3
link 2:  y = u²         slope of y with respect to u:  2u
chain:   dy/dx = (2u) × 3
```

At `x = 1`: u = 4, so the slope is 2×4×3 = **24**.

Check it with arithmetic, like last lesson: nudge x to 1.01 and see how y changes.

```text
x = 1     u = 4      y = 16
x = 1.01  u = 4.03   y = 16.2409
rise 0.2409 over a step of 0.01  →  slope ≈ 24.09   ✓
```

**Why this matters.** A model is a long chain like this: layer → activation → layer → … → error. The chain rule says its slope for any weight is the product of the slopes of all the links between that weight and the error.

**Comprehension question.** Same function, `y = (3x + 1)²`, but now at `x = 2`. What is the slope `dy/dx`? (Link 1: u = 3x + 1, slope 3. Link 2: y = u², slope 2u.)

- **A.** 42
- **B.** 14
- **C.** 21
- **D.** 49

Reply with one letter. First find u at x = 2, then multiply 2u × 3.

**Next actions**
1. You: answer A, B, C or D.
2. Me: then part 2, the computation graph (a flowchart of the st […]

[14:03] GREG: a

[14:03] CLAUDE: **A is correct.** At x = 2, u = 7, so the slope is 2 × 7 × 3 = 42.

## Part 2: the computation graph and the two passes

A model is a chain of small steps. Write each step as a box, and you get a **computation graph**: a flowchart where every box is one simple operation. I ran the lesson's code on this example, `y = relu(x1 × x2 + b)` with `x1 = 2`, `x2 = 3`, `b = 1`:

```text
x1 = 2 ─┐
        ├─ [ × ] → a = 6 ─┐
x2 = 3 ─┘                 ├─ [ + ] → c = 7 → [ relu ] → y = 7
                   b = 1 ─┘
```

**Forward pass:** compute left to right. This is the model making its answer: 2×3 = 6, 6+1 = 7, relu(7) = 7. (relu keeps positive numbers and turns negatives to 0.)

**Backward pass:** start at the output, where the slope of y with respect to itself is 1, and walk right to left. At each box, multiply the slope arriving from the right by that box's own local slope (the chain rule, from part 1):

```text
y → c   relu passes it through (c is positive):   slope 1
c → a   the + box:                                 slope 1
a → x1  the × box: local slope is the OTHER input: 1 × x2 = 3
a → x2  the × box: local slope is the OTHER input: 1 × x1 = 2
```

The code printed exactly `dy/dx1 = 3.0` and `dy/dx2 = 2.0`. This right-to-left walk is **backpropagation**. The program does it automatically for every weight at once, which is **autodiff**.

**Why backward, not forward?** You could instead push slopes left to right, but that needs one pass per input. A model has millions of weights  […]

[14:09] GREG: i quite suck at derivatives so the entire comprehension question seems like chinese i dont know what formula to use what to plug or what tod o

[14:09] CLAUDE: That's useful to hear, and it's my fault for jumping into formula language. **You don't need any derivative formula for this.** Here's what the question really asks, in plain words.

## What "slope of y with respect to x2" means

It's just this: **if I make x2 bigger by 1, how much bigger does y get?** You can answer it by running the numbers twice and subtracting. No formula needed.

Our graph: multiply x1 and x2, add b, keep the result (relu doesn't change a positive number).

```text
Run 1:  x1 = 4, x2 = 5, b = 1   →   4×5 = 20,  20+1 = 21   →   y = 21
Run 2:  x1 = 4, x2 = 6, b = 1   →   4×6 = 24,  24+1 = 25   →   y = 25
```

y went from 21 to 25 when x2 went up by 1, so **y rose by 4.** That's the answer: the slope with respect to x2 is **4**, which happens to equal x1.

The shortcut the backward pass uses is just that pattern: for a multiply box, the slope for one input is **the other input's value.** You can always check it with the two-runs method above.

## Try it yourself the same way

Same graph, `x1 = 4`, `x2 = 5`, `b = 1`, `y = 21`. This time ask about **b**: if you make b bigger by 1 (b goes from 1 to 2), how much does y go up?

- **A.** 0
- **B.** 1
- **C.** 4
- **D.** 5

Run it twice like above: with b = 1 you got y = 21. Now work out y with b = 2, then subtract. Reply with one letter.

**Next actions**
1. You: do the two-run check and answer A, B, C or D.
2. Me: after that, I'll keep every remaining question in this "nudge it and see" style, and add that metho […]

[14:12] GREG: but idk what you mean when you say x1 or x2? like no idea. i feel like youre not using the proper symbols since youre writing in bizarre code. you have to make sure the undercases, or the floatng numbers, and all the symbols used in general are accurate and visiible. cuz you havent been using any

[14:12] CLAUDE: You're right, and thank you for saying so. I was writing `x1`, `x2` and `*` like computer code, and I never told you what the letters stand for. Here's the key I should have given you first.

## Symbol key (what each thing means)

| Symbol | Say it | What it is |
|---|---|---|
| x₁ | "x sub one" | the **first** input number (the small 1 is just a label, like "number 1") |
| x₂ | "x sub two" | the **second** input number |
| b | "b" | a third number we add at the end |
| y | "y" | the answer the machine gives out |
| × | "times" | multiply |
| + | "plus" | add |
| → | "becomes" | goes to |

Small low numbers (₁, ₂) are labels, not maths. x₁ and x₂ are two different numbers, with the 1 and 2 telling them apart. From now on I'll write the proper symbols, like ², ×, ÷ and −, and I'll tell you what each one means the first time I use it.

## The same question, in plain symbols

The machine: take two numbers, multiply them, add a third number, and the result is y.

- first input: x₁ = 4
- second input: x₂ = 5
- added number: b = 1

y = x₁ × x₂ + b = 4 × 5 + 1 = **21**

**The question, in plain words.** Make b one bigger, so b goes from 1 to 2, and leave x₁ and x₂ alone. How much bigger does y get?

Work it out: 4 × 5 + 2 = ? Then subtract the 21 you had before.

- **A.** 0 (y doesn't change)
- **B.** 1 (y goes up by 1)
- **C.** 4 (y goes up by 4)
- **D.** 5 (y goes up by 5)

Reply with one letter.

[14:13] CLAUDE: I've saved this as a standing rule: real symbols, every letter defined before I use it, and no code-style notation in explanations.

**Next actions**
1. You: work out 4 × 5 + 2, subtract 21, and answer A, B, C or D above.
2. Me: once you answer, I'll go through the rest of the lesson with the symbol key at the top of each part.
3. Me: I'll check the cheat sheet for the same problem and fix it where I used code-style notation. That includes the Hessian and gradient cards from Lesson 4.

[14:16] GREG: youre jus giving the plane answer and dumbing down the question in plain laguage so much that i cant figure the problem out myself. use the proper symbols, the original quiz language and explain the formula or process slightly better or mor e beginner friendly i want to be able to look at the problem's complicated language, obscure variables and know what to do myself

[14:16] CLAUDE: Understood. I'll keep the real exam wording, use the proper symbols, and teach you how to decode it yourself. Here's the problem exactly as a textbook would write it, and then the method.

## The problem, in textbook language

> The function y = relu(x₁ · x₂ + b) is evaluated at x₁ = 4, x₂ = 5, b = 1. Using reverse-mode autodiff, compute ∂y/∂x₂.

## Step 1: decode every symbol

| Symbol | Say it | Means |
|---|---|---|
| x₁, x₂ | "x sub one, x sub two" | two separate input numbers. The ₁ and ₂ are just labels. |
| b | "b" | a third number, called the bias, that gets added |
| · | "dot" or "times" | multiply (x₁ · x₂ is the same as x₁ × x₂) |
| relu(z) | "ReLU of z" | the rule: if z is positive keep it, if z is negative make it 0. Written max(0, z). |
| ∂y/∂x₂ | "partial y, partial x₂" | **how much y changes when x₂ goes up a little, with every other input held still.** The ∂ is a curly "d" meaning "change in". |
| reverse-mode autodiff | | the method: work out y going forward, then walk backward multiplying slopes (below) |

So the question says: *"if x₂ goes up a little, how fast does y go up?"*

## Step 2: the method (the same 4 steps every time)

1. **Name the boxes.** Break the formula into one operation per box: a = x₁ · x₂, then c = a + b, then y = relu(c).
2. **Forward pass.** Put the given numbers in, left to right, and write down every box's value.
3. **Backward pass.** Start at y with the slope 1. Go box by box toward the input you want. At each box, **multiply** by […]

[14:23] GREG: 4x5 20 20+1 y=21 y=reil(21)=21 so y to c 1x cto a 1x a to x2 is the other so =4?

[14:23] CLAUDE: **A is correct, and your working was exactly right.** You did the forward pass: 4 · 5 = 20, then 20 + 1 = 21, then relu(21) = 21. For the backward pass you multiplied the slopes along the path: y → c is 1, c → a is 1, a → x₂ is the other input, x₁ = 4. So 1 × 1 × 4 = 4, and ∂y/∂x₂ = 4. That is the full method, and you did it on your own.

## Part 3: two ideas the quiz will ask about

### Idea 1: when a number is used in more than one place, the slopes add up

Take y = x · x at x = 3, which is the same as x². The input x feeds into the multiply box **twice**, once as the first factor and once as the second. Run the backward pass:

- The first factor's slope is the *other* input: 3.
- The second factor's slope is the *other* input: 3.
- Both belong to the same x, so **add them**: 3 + 3 = **6**.

That matches Lesson 4: the slope of x² is 2x = 2 × 3 = 6. ✓

In code this is written `+=`. Read `a += 3` as "take what's already stored in a and add 3 to it", which means a = a + 3. The engine starts every slope at 0 and each path *adds* its contribution. If it used `=` instead, the second path would overwrite the first and the answer would be wrong.

### Idea 2: gradient checking

How do you know your backward pass has no bugs? Compare it with the slope from the "nudge and measure" method of Lesson 4, the central difference (f(x + h) − f(x − h)) / (2h). If the autodiff slope and the nudged slope agree to many decimals, the backward pass is right. The lesson's code did this on five form […]

[14:26] GREG: i have no clue you completely lost me

[14:26] CLAUDE: That's my mistake. I stacked two new ideas on top of a harder problem, and the problem had three paths instead of one. We'll go one small step at a time, and you do each step.

## The problem

y = x · x + x, with x = 2.

Everything uses the method you already did correctly: forward pass first. There's one new thing, which is that the same letter x appears more than once. That's fine, x is just the number 2 everywhere it appears.

## Step 1 of the method: name the boxes

Break the formula into small pieces, one operation each:

- **Box 1:** p = x · x (x times itself)
- **Box 2:** y = p + x (take p, add x)

## Step 2: forward pass (just arithmetic)

Put x = 2 in and work left to right, like you did with 4 · 5 = 20.

- p = x · x = 2 · 2 = ?
- y = p + x = ? + 2 = ?

**What are p and y?** Just type the two numbers, like "p = _, y = _". We'll do the backward part afterward, one step at a time.

[14:27] GREG: how tf did you just break y - x^3 into p = xxx and y=p+x? makes no sense to me

[14:27] CLAUDE: That's a good catch, and I can see where the confusion comes from. **The formula is not x³.** It's x times x, **plus** x.

- **x³** would mean x · x · x, three x's multiplied together. At x = 2, that's 2 · 2 · 2 = 8.
- **My formula, x · x + x**, has a **+** sign in the middle. At x = 2, that's (2 · 2) + 2 = 4 + 2 = 6.

Written with the × sign so the + stands out: **x × x + x**.

## Why I split it into two boxes

Maths does the multiplication before the addition, so you can do it in two moves:

- **Box 1:** do the multiplication part first. Call the result p. That is p = x × x.
- **Box 2:** then add the last x. That is y = p + x.

The letter p is just a name I made up for "the result of the first move", so we can talk about it. It isn't anything new in the problem.

## Back to the small step

Put x = 2 in and do the arithmetic:

- p = x × x = 2 × 2 = ?
- y = p + x = ? + 2 = ?

**What are p and y?** Type the two numbers, like "p = _, y = _".

[14:29] GREG: wait so yeah i hadnt seen it was xxx + x so lets do this. xxx = p p=4 then y=p+x x=2 p=4 then y= 8

[14:29] CLAUDE: **p = 4 is right.** One fix on the second part: "x × x + x" has three x's, but they play different roles. The first two are **multiplied** (that's p), and the third is **added**.

- p = x × x = 2 × 2 = **4** ✓
- y = p + x = 4 + **2** = **6**, not 8. The x we add is 2, not 4.

(An easy slip: 8 is what you get from 4 + 4, or from x³.)

So the forward pass is done: **p = 4 and y = 6.**

## Backward pass, first small step

Now we work backward from y. The first box we meet going backward is Box 2: y = p + x.

I'm asking one question here: *if p gets a little bigger, how much bigger does y get?* Use the nudge method:

- Right now p = 4 and x = 2, so y = 6.
- Make p one bigger, so p = 5, and keep x = 2. Then y = 5 + 2 = ?

**What is y now, and how much bigger is that than 6?** Type the two numbers, like "y = _, it went up by _".

[14:30] GREG: y would be 7  it went up by 1

[14:30] CLAUDE: **Correct: y = 7, up by 1.** That's the plus box's backward rule: when you add, the slope is **1** for each thing being added. So y → p has slope 1, and (for the same reason) y → x directly through the plus box also has slope 1.

## Mapping the three paths

The number x feeds into y by **three separate routes**:

- **Path A:** y → p → the *first* x in x × x
- **Path B:** y → p → the *second* x in x × x
- **Path C:** y → x directly, through the plus box

For each path, multiply the slopes along it (the same thing you did with 1 × 1 × 4).

**Path A, worked for you:**
- y → p: slope 1 (the plus box, which you just found)
- p → first x: the multiply box, and the slope is the *other* input, which is the second x = 2
- multiply: 1 × 2 = **2**

**Path B, your turn:** y → p is 1, then p → second x, where the *other* input is the first x = 2. What is 1 × 2?

**Path C, your turn:** y → x directly through the plus box. What is the slope there? (You found it in the last step: the plus box gives slope ___ to each input.)

Then the last move is the new idea: x is the *same number* in all three places, so **add the three path results**.

**Type your three numbers and the total,** like "A = 2, B = _, C = _, total = _".

[14:33] GREG: plus box givs 1 slope. idont understand the determining factor of this formula. i remember the trick or process used when learning linear algebra when i was in cegep. you had like either 0 or 1 for all the factors, and then there was 1 determining factor that youd use to determine the actual slope for the rest, though there was a wa to know quickly if the factors would be 0 or 1 like super wquick and a super clear delimitation to know what the other than 0 or 1 factor would give

[14:34] CLAUDE: You're remembering something real, and I think it's this. I'm not certain it's the exact method from your CEGEP class, so tell me if I've got it wrong. For each box, the slope for each input comes from a quick check of three cases.

## The 30-second rule for a box's slope

Look at the box and one input, and ask these questions in order:

1. **Is that input in this box at all?** If not, the slope is **0**. (Changing it can't change the box.)
2. **Is it being added or subtracted?** Then the slope is **1** (or −1 if subtracted).
3. **Is it being multiplied by something?** Then the slope is **that other thing**. This is your "one determining factor": the only case where the slope is neither 0 nor 1.
4. **ReLU is the clear cutoff.** relu(z) has slope **1 if z is positive** and **0 if z is negative** (or 0). It's a hard on/off switch.

So the answer is always 0, 1, −1, or "the other number it's multiplied with".

| Box | Input | Slope | Why (rule) |
|---|---|---|---|
| y = p + x | p | 1 | added |
| y = p + x | x | 1 | added |
| p = x × x | first x | the other x = 2 | multiplied |
| p = x × x | second x | the other x = 2 | multiplied |
| c = a + b | z (anything not in the box) | 0 | not in the box |

**Where's the "1 determining factor"?** It's the number a variable is being multiplied by. That is the only slope that isn't just 0 or 1.

## Back to your three paths

You already said the plus box gives slope 1, so **Path C = 1**. For **Path B** use rule 3: the multiply box p = x × x,  […]

[14:35] GREG: a 2 b 1 c 1 total 2

[14:35] CLAUDE: Close, and your Path A and Path C are right. **Path B should be 2, not 1.** It has two links:

- y → p: slope 1 (the plus box)
- p → second x: slope 2 (the multiply box: the other factor is the first x = 2)
- multiply along the path: 1 × 2 = **2**

Path B works exactly like Path A, just through the second factor.

And your "total 2" has one step to fix. The last move is to **add** all three paths, not pick one:

- Path A = 2
- Path B = 2
- Path C = 1
- **total = 2 + 2 + 1 = 5**, so dy/dx = 5 (answer B from the earlier options)

## Proof with the "nudge and measure" check

Make x slightly bigger, from 2 to 2.01, and watch y:

- at x = 2: y = 2 × 2 + 2 = 6
- at x = 2.01: y = 2.01 × 2.01 + 2.01 = 4.0401 + 2.01 = 6.0501
- rise = 0.0501 over a step of 0.01, so the slope ≈ **5.01** ✓

The nudge check agrees with 5. And that is **gradient checking**, one of the quiz topics: compare the backward-pass answer against the nudge-and-measure answer. Adding the three paths is the "slopes add up" idea, the reason the code uses `+=`.

## Quiz, question 1 of 3

Here's the original wording. A reading guide comes first:

- "reverse-mode" means the backward pass, going from output to inputs.
- "forward mode" means doing a separate pass for *each input* instead.
- "inputs" are the weights and numbers you can adjust, and the "loss" is the single error number at the end.

> **Why does PyTorch use reverse-mode autodiff (backpropagation) instead of forward-mode?**
>
> - **A.** Forward mode cannot han […]

[14:36] GREG: b

[14:37] CLAUDE: **B is correct (1/1).** A model has millions of inputs (weights) and one loss output. Reverse mode gets every weight's slope in one backward pass, while forward mode would need millions of passes.

## Quiz, question 2 of 3

A reading guide first:

- "Value class" is the small program object that stores a number and its slope (the `grad`).
- `+=` means "add to what's already stored".
- A value "used in multiple operations" is like your x in y = x × x + x: it feeds three places.

> **In the Value class autograd engine, why does the backward function use `+=` instead of `=` for accumulating gradients?**
>
> - **A.** Because a value used in multiple operations receives gradient contributions from each one, which must be summed.
> - **B.** To average the gradients across multiple samples.
> - **C.** To prevent numerical overflow in the gradients.
> - **D.** Because Python does not support the `=` operator in closures.

Reply with one letter. (You just did this by hand: Paths A, B and C added up to 5.)

[14:38] GREG: a

[14:38] CLAUDE: **A is correct (2/2).** A value used in several places gets a slope contribution from each. With `=` the later contribution would overwrite the earlier one. With `+=` they add up, as your 2 + 2 + 1 = 5 did.

## Quiz, question 3 of 3

A reading guide first:

- "Autodiff gradients" are the slopes from the backward pass.
- "Numerical finite-difference gradients" are the slopes from nudge-and-measure, like (f(x + h) − f(x − h)) / (2h) from Lesson 4.
- "Backward pass" is the right-to-left walk.

> **What is gradient checking and when should you use it?**
>
> - **A.** Checking that gradients are below a threshold to prevent exploding gradients.
> - **B.** Comparing autodiff gradients against numerical finite-difference gradients to verify correctness of the backward pass.
> - **C.** Checking that all parameters received non-zero gradients during training.
> - **D.** Monitoring gradient magnitudes during training to detect vanishing gradients.

Reply with one letter. (You did one by hand a moment ago with x = 2.01.)

[14:38] GREG: b

[14:39] CLAUDE: **B is correct (3/3).** Gradient checking compares the backward-pass slopes against nudge-and-measure slopes. You did it by hand when you got 5.01 at x = 2.01.

## Lesson 5 result: 3/3

The quiz went well, and I'm now putting everything from this lesson on the cheat sheet, including your "slope rules" idea and the 4-step method.

[14:40] CLAUDE: The edit script already has the closing tag, so I'm running it.

[14:41] CLAUDE: ## Lesson 5 result: 3/3

You got reverse versus forward mode, the `+=` accumulation, and gradient checking right. Phase 1 progress: 5 of 22 lessons.

This lesson was harder, and you said so clearly. Three things came out of it:
- **Your "0 or 1 factors" memory:** it became the **slope rules table** (not in the box → 0, added → 1, subtracted → −1, multiplied → the other factor, relu → 1 if positive and 0 otherwise). It's now a card on the sheet. If your CEGEP version had anything different, tell me.
- **The 4-step method:** name the boxes, forward pass, backward pass, add up every path. You applied it correctly on your own for ∂y/∂x₂ = 4. The three-path problem (y = x × x + x, answer 5) took guided steps, and that's recorded honestly in `LEARNING.md`.
- **Notation:** I saved a standing rule that I use real symbols (x₁, ², ×, ∂), define each one before using it, and keep the original wording of problems with a decoding guide.

**Cheat sheet, version 5:** it has six new entries in Part 5:
- chain rule
- computation graph, with sliders for x₁, x₂ and b
- the slope rules table with the 4 steps
- slopes add up (+=)
- gradient checking, with buttons for the step size
- reverse versus forward mode

The symbol decoder gained rows for x₁/x₂, ·, relu, ∂y/∂x₂ and +=. All 42 examples ran clean in my check, including a case where relu switches off. I haven't opened the sheet in a browser. `LEARNING.md` and `docs/timeline.md` are updated. I did not refresh BOULON HQ for lessons 4 and 5.

** […]

[14:41] GREG: next lesson

[14:42] CLAUDE: ## Warm-up recall (no stakes)

A reading guide for the words:
- **Composed functions** means functions chained together, like the layer → activation → error chain.
- **Derivative** means slope.
- **Nodes** are the boxes in a flowchart, and **edges** are the arrows between them.

**Recall 1.** What does the chain rule in calculus state?

- **A.** Functions can only be differentiated if they are linear.
- **B.** The derivative of composed functions is the product of their individual derivatives.
- **C.** The derivative of a sum is the sum of derivatives.
- **D.** The integral of a product is the product of integrals.

**Recall 2.** What is a computational graph?

- **A.** A directed graph where nodes are operations and edges carry values forward or gradients backward.
- **B.** A diagram showing the architecture of a neural network.
- **C.** A graph database used for storing training data.
- **D.** A plot of loss versus training steps.

Reply with two letters, like "X, Y", or "idk". (Both come straight from the gears and flowchart pictures in the last lesson.)

---

## Lesson 6 preview: Probability and Distributions (~75 min)

The lesson text is in [docs/en.md](references/ai-engineering-from-scratch/phases/01-math-foundations/06-probability-and-distributions/docs/en.md). The one idea:

> **A model never says "the answer is X". It says "X is 91% likely, Y is 6%, Z is 3%."** That list of percentages is what this lesson is about, and the quiz is on three things you'll meet: *softma […]

[14:44] GREG: b a

[14:44] CLAUDE: **Both correct.** The chain rule multiplies the individual slopes (B), and a computational graph is boxes with arrows carrying values forward and slopes backward (A).

## Part 1: what a probability is

**Symbol key:**

| Symbol | Say it | Means |
|---|---|---|
| P(cat) | "P of cat" | the probability that the answer is "cat": a number from 0 to 1 |
| 0 | | impossible |
| 1 | | certain |
| 0.5 | | a coin flip, 50% |
| Σ | "sigma" | "add up all of these" |

A probability is a number from 0 to 1 saying how likely something is. 0.91 means 91% likely.

**The key rule.** If you list *every* possible answer, their probabilities must **add up to exactly 1** (together they cover everything that can happen). In symbols, Σ pᵢ = 1: add up all the p's and you get 1. The lesson's example is a classifier that looks at a picture and outputs three numbers:

```text
[0.03, 0.91, 0.06]     0.03 + 0.91 + 0.06 = 1.00 ✓
 cat   dog   bird
```

It's 91% sure it's a dog. This list of probabilities for all the answers is called a **distribution**. A language model does the same, but with about 50,000 answers (every possible next word), and they still add up to 1.

**A fair die** is the simplest case: six answers, each 1/6, so 6 × (1/6) = 1. And P(even) = P(2) + P(4) + P(6) = 3/6 = 0.5.

**Comprehension question.** A model looks at a photo and outputs:

P(cat) = 0.7, P(dog) = 0.2, P(bird) = ?

These are the only three possible answers. What must P(bird) be?

- **A.** 0.1
- **B.** 0.9
- **C.** 0.3
- **D. […]

[14:45] GREG: .1

[14:46] CLAUDE: **A is correct.** 0.7 + 0.2 + P(bird) = 1, so P(bird) = 0.1.

## Part 2: softmax (turning raw scores into percentages)

A neural network's last layer doesn't output percentages. It outputs raw scores, called **logits**, like `[2, 1, 0]`: any numbers, positive or negative, that don't add up to 1. **Softmax** is the two-step recipe that turns them into a proper distribution.

**Symbol key:**

| Symbol | Say it | Means |
|---|---|---|
| z | "z" | one raw score (logit) |
| eᶻ or exp(z) | "e to the z" | a button that turns any number into a positive one. Bigger z gives a much bigger result. |
| Σ eᶻ | "sum of e to the z" | the total after pressing that button on every score |

The button values you need: e⁰ = 1, e¹ ≈ 2.72, e² ≈ 7.39, and for negatives e⁻¹ ≈ 0.37, e⁻² ≈ 0.14. (e is just a fixed number, about 2.718.)

**Recipe, with `[2, 1, 0]`:**

1. **Press the button on each score:** e² = 7.39, e¹ = 2.72, e⁰ = 1.
2. **Divide each by the total.** The total is 7.39 + 2.72 + 1 = 11.11.

```text
7.39 / 11.11 = 0.665
2.72 / 11.11 = 0.245
1.00 / 11.11 = 0.090        0.665 + 0.245 + 0.090 = 1 ✓
```

Now the scores are probabilities: all positive, all adding to 1, and the highest score gets the highest probability. The lesson's code printed the same result.

### The "softmax trick" (quiz topic)

Computers break on huge numbers. For the scores `[100, 101, 102]`, e¹⁰² is so big it overflows, and the program crashes or returns nonsense. The trick: **subtract the biggest score from every sco […]

[15:00] GREG: b

[15:01] CLAUDE: **B is correct.** Subtracting the same number from every score changes nothing, because it cancels when you divide. That's the whole reason the trick is safe.

## Part 3: cross-entropy (how the model gets graded)

When a model is trained it needs a single number saying how wrong it was. For classification, that number is the **cross-entropy loss**. The lesson says it simplifies to **−log(q)**, where q is the probability the model gave to the **correct** answer.

**Symbol key:**

| Symbol | Say it | Means |
|---|---|---|
| q | "q" | the probability the model assigned to the *correct* answer |
| log(q) | "log of q" | the opposite of the eᶻ button: it answers "e to what power gives q?" |
| −log(q) | "minus log of q" | log with the sign flipped, so the loss comes out positive |

Values you need (they're natural logs, which is what machine learning uses):

| q | log(q) | −log(q) = loss |
|---|---|---|
| 1 (certain) | 0 | **0** |
| 0.9 | −0.11 | **0.11** |
| 0.5 | −0.69 | **0.69** |
| 0.1 | −2.30 | **2.30** |
| 0.01 | −4.61 | **4.61** |

Two facts:
- log(1) = 0, and log of anything between 0 and 1 is negative. So −log(q) is zero or positive.
- The closer q gets to 0, the more extreme the loss becomes.

**Example from the code output.** The scores `[2.0, 1.0, 0.1]` became probabilities `[0.659, 0.242, 0.099]`. If the correct answer is the first class, then q = 0.659, so the loss is −log(0.659) = **0.417**. The code printed exactly `0.4170`.

**The intuition, in a sentence:** the los […]

[15:12] GREG: model b has larger loss

[15:12] CLAUDE: **Correct: Model B.** Its loss of 2.30 is much larger than Model A's 0.11, because it gave the right answer only a 10% chance.

## Part 4: why models use log probabilities

A language model gives a probability to every word it writes. The probability of a **whole sentence** is all of them multiplied together:

P(sentence) = P(word₁) × P(word₂) × P(word₃) × …

Each factor is small. Multiply many small numbers and you get a tiny number. The lesson's code showed this with 50 words that each have probability 0.01:

```text
0.01 × 0.01 × … (50 times) = 0.0000…01, about 1e-100 (a 1 after 100 zeros)
```

That's already small. A computer can only store numbers down to about 1e-308. A long enough sentence goes below that and the computer silently rounds the answer to **0**. This is called **underflow** (the number sinks below what can be stored), and it ruins the calculation.

**The fix: use logs.** One rule about logs does it:

log(a × b) = log(a) + log(b)

A **product** of probabilities becomes a **sum** of their logs, and sums of ordinary-sized negative numbers never underflow. Check it with two words, probabilities 0.01 and 0.001:

```text
direct:   0.01 × 0.001 = 0.00001,   log(0.00001) = −11.51
with logs: log(0.01) + log(0.001) = −4.61 + (−6.91) = −11.51   ✓ same
```

And the code's 50-word case: 50 × log(0.01) = 50 × (−4.61) = **−230.26**, an ordinary number, no underflow. (Then you could still recover 1e-100 from it, and the code did.)

Two more facts the lesson states: log pr […]

[15:43] GREG: d

[15:44] CLAUDE: **It's B, −6.91.** The rule says to **add** the logs, so there are three of them to add, and each is −2.30:

−2.30 + (−2.30) + (−2.30) = **−6.91**

Cross-check with the ordinary product: 0.1 × 0.1 × 0.1 = 0.001, and log(0.001) = −6.91 ✓.

You picked −0.69. That's the log of 0.5, and it doesn't come from this problem, so I think you may have guessed. The common slip is to take only one word's log (−2.30) or to forget how many terms there are. The rule is: **one log per word, then add them all.**

## One more to lock it in

A sentence where each word has probability 0.1, but now **four words**. Each log(0.1) = −2.30. Add the four logs. What is the log of the sentence probability?

- **A.** −9.21
- **B.** −2.30
- **C.** 0.0001
- **D.** −0.92

Reply with one letter. (Four terms of −2.30: count them as you add.)

[15:45] GREG: a

[15:45] CLAUDE: **A is correct.** Four terms of −2.30 add to −9.21, so you've got the "one log per word, then add" rule.

## Quiz: 3 questions, original wording, no hints

I'll give a short reading guide before each one so you can decode it yourself.

### Question 1 of 3

Reading guide:
- **Logit** means a raw score from the network, before softmax.
- **Exponentiating** means pressing the eᶻ button on each score.
- **Overflow** means a number too huge for the computer to store (the opposite of underflow).
- **Mathematically identical** means the final answer comes out the same.

> **Why does softmax subtract the maximum logit before exponentiating (the "softmax trick")?**
>
> - **A.** To make all probabilities equal.
> - **B.** To prevent numerical overflow from exponentiating large numbers while producing mathematically identical results.
> - **C.** To speed up the computation by reducing the number of exponentiations.
> - **D.** To normalize the logits to have mean zero.

Reply with one letter.

[15:45] GREG: b

[15:45] CLAUDE: **B is correct (1/1).** Subtracting the biggest score keeps the numbers small enough to compute, and the answer comes out the same. You showed that yourself with the "subtract 10" question.

### Question 2 of 3

Reading guide:
- **Cross-entropy loss** is the grade for a classification, from Part 3.
- **−log(q(true_class))** means minus the log of the probability the model gave to the *correct* answer, the q from the table.
- **Penalize** means give a higher loss number (a worse grade).
- **Intuitively** means "in plain terms, what is it doing?"

> **Cross-entropy loss for classification simplifies to −log(q(true_class)). What does this mean intuitively?**
>
> - **A.** Multiply the predicted probabilities by the true labels.
> - **B.** Penalize the model based on how low its predicted probability is for the correct class. Lower prediction means higher loss.
> - **C.** Average the log probabilities across all classes.
> - **D.** Compute the entropy of the true distribution.

Reply with one letter.

[15:46] GREG: b

[15:46] CLAUDE: **B is correct (2/2).** The lower the probability the model gave the right answer, the higher the loss. That's the 0.11 versus 2.30 comparison you did.

### Question 3 of 3

Reading guide:
- **Log probabilities** are the logs of probabilities (always zero or negative).
- **Underflow** means a number so tiny the computer rounds it to 0.
- **Converts products to sums** is the rule log(a × b) = log(a) + log(b).

> **Why do language models work with log probabilities instead of raw probabilities?**
>
> - **A.** Multiplying many small probabilities causes numerical underflow to zero. Log probabilities convert products to sums, avoiding this.
> - **B.** Log probabilities are easier to interpret visually.
> - **C.** Raw probabilities cannot represent values less than 0.01.
> - **D.** Log probabilities are required by the transformer architecture.

Reply with one letter.

[15:46] GREG: a

[15:47] CLAUDE: **A is correct (3/3).** Raw probabilities multiplied together underflow to zero, and logs turn the product into a sum that stays safe.

## Lesson 6 result: 3/3

You got the softmax trick, cross-entropy and log probabilities right. Two small slips on the way: the log-of-a-product question took a retry, and I wrote that up honestly in `LEARNING.md`. I'm now adding the lesson to the cheat sheet.

[15:49] CLAUDE: An apostrophe in "Bayes' theorem" broke the script. Fixing it.

[15:51] CLAUDE: ## Lesson 6 result: 3/3

You got the softmax trick, cross-entropy and log probabilities right. Phase 1 progress: 6 of 22 lessons.

**What you can now explain:**
- A model outputs a distribution: a list of probabilities for every answer, adding up to exactly 1.
- Softmax turns raw scores into probabilities. Subtracting the biggest score first doesn't change the answer, and it stops overflow.
- The loss for one answer is −log(q), where q is the probability the model gave the correct answer. A low q means a high loss.
- A sentence's probability is a long product, so models add logs instead to avoid underflow.

**Cheat sheet, version 6:** I added Part 6 (probability) with six entries:
- distributions, with sliders you can drag until they stop adding to 1
- PMF versus PDF
- expected value and variance, worked on the die
- softmax, with a button that shows it breaking at 1000, 1001, 1002 and the trick fixing it
- cross-entropy, with a slider for q
- log probabilities, where you push the word count up until the plain product underflows to 0

The symbol decoder gained P(A), eᶻ, log(q) and logit. I fixed a small bug where an apostrophe in my own text broke the page script, before publishing. All 48 examples then ran clean. I haven't opened the sheet in a browser. `LEARNING.md` and `docs/timeline.md` are updated. I did not refresh BOULON HQ for lessons 4 to 6.

**Next lesson:** Lesson 7, Bayes' theorem. It covers how to update how likely something is when you get new evidence. It's a g […]
