# JavaScript Prototypes: Concept Notes

## 1. Definitions

| Term | Definition |
|---|---|
| **Object** | A collection of key-value pairs (properties and methods). |
| **Prototype** | An object that another object inherits properties and methods from. Every object has one (except the end of the chain). |
| **`[[Prototype]]`** | The hidden internal link from an object to its prototype. It is not a normal property. |
| **`__proto__`** | A legacy getter/setter used to read or change `[[Prototype]]`. |
| **Prototype chain** | The series of linked prototypes JavaScript walks through when looking up a property. |
| **Inheritance** | An object using properties and methods defined on its prototype instead of its own. |
| **Own property** | A property that exists directly on the object itself. |
| **Inherited property** | A property found further up the prototype chain, not on the object itself. |
| **Shadowing** | When an object's own property has the same name as an inherited one, so the own property wins. |
| **`Object.prototype`** | The top of almost every chain. It holds common methods like `toString()` and `hasOwnProperty()`. |
| **`null`** | The end of the chain. It has no prototype. |

---

## 2. What Problem Do Prototypes Solve?

Without prototypes, shared data and behaviour would have to be copied into every object. Prototypes let objects **share** it through a link instead.

```
WITHOUT prototypes (duplication)        WITH prototypes (sharing)

 laptop1 { cpu: 12, screen }             computer { cpu: 12 }
 laptop2 { cpu: 12, screen }                  ▲          ▲
 laptop3 { cpu: 12, screen }                  │          │
                                          laptop1     laptop2
 cpu is copied 3 times                    cpu is stored once
```

---

## 3. How Property Lookup Works

When you access `obj.key`, JavaScript follows these steps:

1. Check if `key` exists on `obj` itself. If yes, return it.
2. If not, move to `obj`'s prototype and check there.
3. Repeat up the chain.
4. If `null` is reached without finding it, return `undefined`.

```
        obj.key
           │
           ▼
   ┌───────────────┐   found    ┌────────────┐
   │ obj itself    │ ─────────► │ return it  │
   └───────┬───────┘            └────────────┘
           │ not found
           ▼
   ┌───────────────┐   found    ┌────────────┐
   │ obj.prototype │ ─────────► │ return it  │
   └───────┬───────┘            └────────────┘
           │ not found
           ▼
   ┌───────────────┐   found    ┌────────────┐
   │ Object.proto  │ ─────────► │ return it  │
   └───────┬───────┘            └────────────┘
           │ not found
           ▼
        null  ───────────────►  undefined
```

---

## 4. The Prototype Chain

A chain is a linked list of objects, each pointing to its prototype.

```
 lenevo                computer             Object.prototype
┌──────────────┐      ┌──────────────┐      ┌─────────────────────┐
│ screen: "HD" │      │ cpu: 12      │      │ toString()          │
│              │      │              │      │ hasOwnProperty()    │
│ [[Prototype]]│─────►│ [[Prototype]]│─────►│ [[Prototype]]       │───► null
└──────────────┘      └──────────────┘      └─────────────────────┘
   own: screen           own: cpu              own: built-in methods
   inherited: cpu        inherited: toString
```

Key rules:

- Lookup goes **upward only**. A prototype cannot see its child's properties.
- An object has **one** prototype, but chains can be any length.
- Circular chains are not allowed (they throw a `TypeError`).

---

## 5. Own vs Inherited Properties

```
 tesla
┌───────────────────────┐
│ driver: "AI"          │  ← OWN property
│ [[Prototype]] ────────┼──► genericCar
└───────────────────────┘    ┌──────────────┐
                             │ tyre: 4      │  ← INHERITED by tesla
                             └──────────────┘
```

| Check | Looks at | Example result for `tesla` |
|---|---|---|
| `obj.hasOwnProperty("x")` | Only the object itself | `"tyre"` → `false` |
| `"x" in obj` | The whole chain | `"tyre"` → `true` |

---

## 6. Reading vs Writing Properties

**Reading** walks up the chain. **Writing** always happens on the object itself.

```
BEFORE:  lenevo.cpu = 16

 lenevo { screen }  ───►  computer { cpu: 12 }

AFTER:   lenevo.cpu = 16

 lenevo { screen, cpu: 16 }  ───►  computer { cpu: 12 }
          ▲
          └── new OWN property created (this shadows the inherited cpu)
              computer.cpu is NOT changed
```

---

## 7. Ways to Link Objects

```
 Method 1: Literal            Method 2: After creation      Method 3: Object.create
 ┌─────────────────────┐      ┌────────────────────────┐    ┌──────────────────────┐
 │ { __proto__: parent}│      │ Object.setPrototypeOf  │    │ Object.create(parent)│
 │                     │      │        (obj, parent)   │    │                      │
 │ Set at birth        │      │ Set later              │    │ Set at birth         │
 │ Readable            │      │ Can slow performance   │    │ Recommended          │
 └─────────────────────┘      └────────────────────────┘    └──────────────────────┘
```

| Purpose | Syntax | Recommendation |
|---|---|---|
| Set at creation | `{ __proto__: parent }` | Fine |
| Set after creation | `Object.setPrototypeOf(obj, parent)` | Use sparingly |
| Create with a prototype | `Object.create(parent)` | Best |
| Read the prototype | `Object.getPrototypeOf(obj)` | Best |
| Read via property | `obj.__proto__` | Avoid in new code |

---

## 8. Inheritance Compared

| Language style | How inheritance works |
|---|---|
| Class-based (Java, C++) | Classes are blueprints. Objects are copies built from a class. |
| Prototype-based (JavaScript) | Objects inherit **directly from other objects** through a live link. |

```
Class-based:    Class ──(instantiate)──► Object

Prototype-based:    Object ◄──(links to)── Object
```

JavaScript's `class` keyword is syntax on top of this same prototype system.

---

## 9. Common Misconceptions

| Misconception | Reality |
|---|---|
| "The child copies the parent's properties." | The child only **links** to the parent. Nothing is copied. |
| "Changing the child changes the parent." | Writing creates an own property on the child. The parent is unchanged. |
| "Changing the parent doesn't affect the child." | The link is live, so child lookups see parent changes immediately. |
| "`__proto__` is the prototype." | `__proto__` is only an accessor for the hidden `[[Prototype]]`. |

---

## 10. Quick Revision

- **Prototype**: the object another object falls back to when a property is missing.
- **Prototype chain**: the linked series of fallbacks, ending at `null`.
- **Lookup**: own property first, then up the chain, then `undefined`.
- **Write**: always creates or updates an own property (shadowing).
- **Best practice**: use `Object.create()` and `Object.getPrototypeOf()`.

```
object ──► prototype ──► Object.prototype ──► null
```

---

## 11. Example Used in Class

```javascript
let computer = { cpu: 12 }
let lenevo = { screen: "HD", __proto__: computer }

let genericCar = { tyre: 4 }
let tesla = { driver: "AI" }
Object.setPrototypeOf(tesla, genericCar)

console.log(Object.getPrototypeOf(tesla)); // { tyre: 4 }
```

```
lenevo ──► computer ──► Object.prototype ──► null
tesla  ──► genericCar ──► Object.prototype ──► null
```
