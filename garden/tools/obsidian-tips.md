I write most of my articles here in markdown files on the platform Obsidian. As a result, I've often had to search for how to get some of the formatting I want. So I made myself a reference page to easily come back to the formatting I like to use most.

---
## Highlight Text

Standard markdown doesn't include a simple highlighter, but Obsidian natively supports it using double equals signs (`==`).

- **Syntax:** `==highlighted text==`
- **Output:** ==highlighted text==
---
## Preserving Formatting in Formulas

In Obsidian, math formulas are powered by **LaTeX (MathJax)** syntax.

In LaTeX, regular whitespace is ignored in math mode, and letters are rendered as italicized math variables--resulting in words to be $squished together like this$.

Here are the best ways to preserve spaces and format text properly:
### Method 1: Use `\text{...}` (Recommended for plain text)

Wrapping text inside `\text{}` preserves spaces **and** applies normal text formatting instead of math italics.
#### Example:
Code snippet
```Markdown
$$
\text{smaller groups} \Rightarrow \text{less error but more metadata}
$$
```
##### Output:
$$
\text{smaller groups} \Rightarrow \text{less error but more metadata}
$$

### Method 2: Explicit Space Commands

If you want to keep the italic math mode font but add spacing manually, use a backslash followed by a space `\` or math spacing commands:

|Command|Spacing Effect|Example|
|---|---|---|
|`\`|Standard space|`smaller\ groups`|
|`\;`|Medium space|`a \; b`|
|`\quad`|Large space (approx. width of 'm')|`a \quad b`|
|`\qquad`|Double-large space|`a \qquad b`|
#### Example:
Code snippet
```Markdown
$$
smaller\ groups \Rightarrow less\ error\ but\ more\ metadata
$$
```
##### Output: 
$$
smaller\ groups \Rightarrow less\ error\ but\ more\ metadata
$$
---
### Basic Fraction Syntax

To write fractions, you use the standard LaTeX fraction command: `\frac{numerator}{denominator}`.

Place your equation between dollar signs to switch to math mode:

- **Inline Math** (fits in line with text): `$ \frac{a}{b} $`
- **Block Math** (centered on a new line): `$$ \frac{a}{b} $$`
#### Example:
```Markdown
**Quadratic formula:** $\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
```
##### Output: 
**Quadratic formula:** $\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
### Sizing Options: Standard vs. Large Fractions

By default, inline fractions scale down so they don't mess up your line spacing. If you want full-sized fractions inside a text sentence, swap `\frac` with `\dfrac` (display fraction).

| **Style**           | **Syntax**       | **Output**     |
| ------------------- | ---------------- | -------------- |
| **Inline (Small)**  | `$\frac{1}{2}$`  | $\frac{1}{2}$  |
| **Display (Large)** | `$\dfrac{1}{2}$` | $\dfrac{1}{2}$ |
### Nested & Complex Fractions

To put fractions inside fractions, simply nest additional `\frac{}{}` commands inside the curly braces `{}`:

```Markdown
$$ \frac{1}{1 + \frac{1}{x}} $$
```
##### Output: 
$$\frac{1}{1 + \frac{1}{x}}$$
> [!tip] Tip
> Using curly brackets around commas `{,}` can help make long numbers look more put together.
> ##### Example:
> **With curly brackets**
> ```Markdown
> $1\text{ GB}=1{,}000{,}000{,}000\text{ bytes}$
> ```
> Output:
> $1\text{ GB}=1{,}000{,}000{,}000\text{ bytes}$
> 
> **Without curly brackets**
> ```Markdown
> $1\text{ GB}=1,000,000,000\text{ bytes}$
> ```
> Output:
> $1\text{ GB}=1,000,000,000\text{ bytes}$

### Dynamic Parentheses Tip

If your fraction is enclosed in parentheses, standard brackets `( )` will look too small. 

#### Example:
```Markdown
$$ (\frac{x+1}{x-1}) $$
```
##### Output:
$$ (\frac{x+1}{x-1}) $$

Instead, use `\left(` and `\right)` to force brackets to auto-scale to your fraction's height:
#### Example:
```Markdown
$$ \left( \frac{x+1}{x-1} \right) $$
```
##### Output: 
$$ \left( \frac{x+1}{x-1} \right) $$

---
## Callouts & Admonitions

Callouts are stylized blocks used to draw attention to notes, warnings, tips, or quotes. They start with `>[!TYPE]`.
#### Example:
- **Syntax:**
- ```> [!info] Quick Info```
  ```> You can collapse callouts by adding a minus sign like `> [!info]-`.```
##### Output: 
> [!info] Quick Info
> You can collapse callouts by adding a minus sign like `> [!info]-`.

- **Common Callout Types:**

| **Type**    | **Syntax**     | **Output** + **Best Used For**          |
| ----------- | -------------- | --------------------------------------- |
| **Info**    | `> [!info]`    | > [!info] General notes & key takeaways |
| **Warning** | `> [!warning]` | > [!warning] Things to be careful about |
| **Tip**     | `> [!tip]`     | > [!tip] Useful tricks or shortcuts     |
| **Check**   | `> [!check]`   | > [!check] Completed tasks or successes |

---
## Inline Code vs. Code Blocks

To prevent Obsidian from converting special characters (like math syntax or markdown tags) into formatting, wrap your text in backticks ( `).

- **Inline Code:** Use single backticks `like this` for short snippets.
- **Multi-line Code Block:** Use triple backticks ``` and specify the language for syntax highlighting.

Markdown

````
```python
def greet(name):
    print(f"Hello, {name}!")
````
##### Output: 
```python
def greet(name):
    print(f"Hello, {name}!")
````

---
## Internal Links & Alias Text

You can link directly to other notes in your vault using double square brackets `[[Note Title]]`. If you want the link to display different text than the note name, use a pipe `|`.

*   **Syntax:** `[[Actual Note Name|Display Text]]`
#### Example:
```markdown
Check out my guide on [[obsidian-tips|Obsidian Formatting]] for more details.
````
##### Output: 
Check out my guide on [[obsidian-tips|Obsidian Formatting]] for more details.

---
## Footnotes

Footnotes are great for adding extra context, citations, or side thoughts without cluttering your main paragraph.

- **Syntax:** Place `[^1]` inline where you want the reference number, then define `[^1]:` at the bottom of your note.
#### Example:
```Markdown
Quantization involves trade-offs between model accuracy and size[^1].

[^1]: Smaller group sizes preserve weights better but require more metadata.
```
##### Output: 
Quantization involves trade-offs between model accuracy and size[^1].

[^1]: Smaller group sizes preserve weights better but require more metadata.
---
