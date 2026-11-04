# My AI Engineering Path
<!-- Managed by the ai-engineering-from-scratch learning skills.
     Repo: https://github.com/rohitg00/ai-engineering-from-scratch -->

## Mission
Ship an AI product. Build goal: a RAG product (retrieval-augmented question answering, as in the BOULON project).

## Placement
- Date: 2026-10-20
- Score: 2/10 (Math & Statistics 0/2, Classical ML 1/2, Deep Learning 0/2, NLP & Transformers 0/2, Applied AI 1/2)
- Entry point: Phase 1: Math Foundations
- Pace: ~10 h/week

## Path
| Phase | Name | Status | Est. hours |
|-------|------|--------|------------|
| 0 | Setup & Tooling | Skip | -- |
| 1 | Math Foundations | Do | 23 |
| 2 | ML Fundamentals | Do | 26 |
| 3 | Deep Learning Core | Do | 15 |
| 4 | Computer Vision | Do | 27 |
| 5 | NLP — Foundations to Advanced | Do | 30 |
| 6 | Speech & Audio | Do | 18 |
| 7 | Transformers Deep Dive | Do | 14 |
| 8 | Generative AI | Do | 14 |
| 9 | Reinforcement Learning | Do | 13 |
| 10 | LLMs from Scratch | Do | 26 |
| 11 | LLM Engineering | Do | 19 |
| 12 | Multimodal AI | Do | 65 |
| 13 | Tools & Protocols | Do | 76 |
| 14 | Agent Engineering | Do | 55 |
| 15 | Autonomous Systems | Do | 20 |
| 16 | Multi-Agent & Swarms | Do | 28 |
| 17 | Infrastructure & Production | Do | 34 |
| 18 | Ethics, Safety & Alignment | Do | 31 |
| 19 | Capstone Projects | Do | 620 |

## Progress log
| Date | Lesson | Quiz | Note |
|------|--------|------|------|
| 2026-10-20 | 01/01 Linear Algebra Intuition | 2/3 | Got dot product, independence, rank. Said "idk" on LoRA (low-rank updates: two small matrices instead of the full one) |
| 2026-10-20 | 01/02 Vectors, Matrices & Operations | 1/2 | Warm-up recall 2/2. Got matrix shapes and transpose. Missed zero determinant (not taught before quiz; explained after): det 0 = flattens info, no inverse |
| 2026-10-20 | 01/03 Matrix Transformations | 2/3 | Warm-up recall 1/2 (missed identity matrix). Got order-matters and exploding eigenvalues. Said idk on eigendecomposition (A = V D V^-1: stretch 3x along [1,1], unchanged along [1,-1]) |
| 2026-10-20 | Review quiz (01/01-03) | 4/4 | After step-by-step re-teaching: determinant 0, identity, eigenvectors (from scratch, 2 extra checks), LoRA (2 thin matrices = 16,000 vs 1,000,000 numbers) |
| 2026-10-20 | 01/04 Calculus for ML | 3/3 | Warm-up recall 2/2. Taught every concept before the quiz: slope, update rule (4 - 0.1*8 = 3.2), learning rate trap, central difference, Hessian N x N (1,000 weights = 1,000,000 numbers) |
| 2026-10-20 | 01/05 Chain Rule & Autodiff | 3/3 | Warm-up recall 2/2. Struggled with formula-first questions and code-style notation x1/x2; worked through by hand with a 4-step method and a slope table (0, 1, -1, other factor). Needed guided steps for the 3-path example y = x*x + x (answer 5). Wants real symbols and original quiz wording with a decoding guide |
| 2026-10-20 | 01/06 Probability & Distributions | 3/3 | Warm-up recall 2/2. Used symbol key + decoding guides. Got distribution sums to 1, softmax shift-invariance, cross-entropy intuition. Slipped on log of a product (picked -0.69 not -6.91) then got the retry (4 words = -9.21). Quiz in original wording |
| 2026-10-21 | 01/07 Bayes' Theorem | 3/3 | Warm-up recall 2/2. Counting method clicks best (natural frequencies). Missed two counting problems at first (divided by sick/all instead of all positives; stopped before dividing by P(evidence)), then got it: 'divide = shrink the crowd to those with the evidence'. Quiz: Laplace smoothing, MAP vs MLE, Beta(8,4) |

## Review queue
- (cleared 2026-10-20) determinant 0, identity matrix, eigendecomposition, LoRA: all re-taught and answered correctly. Re-test in a week.
