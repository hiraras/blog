# next.js

## 安装

```bash
npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
```

## 样式

支持 tailwind 和 css module

global.css 中声明了一些样式，被 layout.tsx 全局引用之后，界面内的 tailwind 才会生效

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

css module 用法则和 create-react-app 项目一样

## 添加字体

```tsx
// 增加 app/ui/fonts.ts
import { Inter, Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const lusitana = Lusitana({
    weight: ["400", "700"],
    subsets: ["latin"],
});

// 后续就可以通过添加类名实现字体注入了
import { lusitana } from "@/app/ui/fonts";
<p className={`${lusitana.className}`}></p>;
```

**问题**：nextjs 的 next/font 模块，说在构建时先下载字体文件，以实现界面加载时，避免这个字体文件的请求以提升性能，但实际请求的大小不是一样的吗？

有以下优化点:

1. 少了“级联请求”（critical path 更短）

传统：HTML → CSS → font
next/font：HTML → font（直接）

2. 同源请求避免了:

-   DNS 查询
-   TLS 握手
-   跨域延迟

3. 自动 preload

```html
<link rel="preload" as="font" />
```

4. 避免布局闪烁（CLS 优化） - CLS -> 字体文件加载前会使用浏览器默认字体，加载后会刷新界面字体，就可能出现闪烁/位置变化等现象

5. 可选：子集化（subset）

只加载需要的字符

## 图片

nextjs 的 Image 组件对图片进行了以下优化

-   防止图片加载时布局自动偏移。
-   调整图片大小，避免向视口较小的设备发送过大的图片。
-   默认采用图片延迟加载（图片在进入视口时加载）。
-   在浏览器支持的情况下，以 WebP 和 AVIF 等现代格式提供图片。

```tsx
import Image from "next/image";

<Image
    src="/hero-mobile.png"
    width={560}
    height={620}
    className="block md:hidden"
    alt="Screenshot of the dashboard project showing mobile version"
/>;
```

## 路由

-   app 目录下，除了几个特殊命名的文件夹(ui/lib/query/seed)，其他目录如果文件夹下有 `page.tsx` 文件，则会认定这是用户创建的一个路由界面，并对它生成一个路由
-   `page.tsx` 文件同级的 `layout.tsx` 文件会被认为该级目录下的公共界面布局，接受`children`属性，`page.tsx` 中的组件会作为`children`传入 `layout`
-   路由的路径和文件夹名对应 `testA` 文件夹 对应 `/testA`
-   app 目录下的`page.tsx`和`layout.tsx`文件对应的根目录 `/`

### Link 组件

```tsx
import Link from "next/link";

<Link
    key={link.name}
    href={link.href}
    className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
>
    <LinkIcon className="w-6" />
    <p className="hidden md:block">{link.name}</p>
</Link>;
```

Link 可以让 next.js 界面跳转时，实现类似 web 单页应用一样的路由切换体验，原因如下:

-   每个路由都进行了代码分割使每个界面的 js 代码很小
-   next.js 在渲染 Link 的时候会对 href 的链接进行 prefetch

### usePathname()

这个 hook 是 react 的 hook，所以需要将使用它的组件变更为[客户端组件]

```tsx
"use client"; // 放在最顶部

import { usePathname } from "next/navigation";

const pathname = usePathname();
```

## 静态渲染

### 获取数据并渲染 - 发生在项目打包时

```tsx
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import { lusitana } from "@/app/ui/fonts";
import { fetchRevenue } from "@/app/lib/data";

export default async function Page() {
    const revenue = await fetchRevenue();
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart revenue={revenue} />
            </div>
        </main>
    );
}
```

静态渲染的缺点

-   无法获取实时数据，界面在打包的时候就确认了结果
-   如果一个请求很慢，其他请求会被阻塞(即使用了 Promise.all，如果其中一个请求很慢，其他请求也会被拖慢)

优点

-   静态文件被发布到 vercel 等服务上，用户访问时请求会被优化，速度极快
-   一些请求在打包时就被请求了，无需客户端访问时请求
-   静态文件能被缓存，二次请求速度更快

### loading.tsx

-   假设有一个界面 [dashboard]，在它的目录下有[customers]子目录
-   如果 dashboard 的 page 组件导出一个 async 函数并使用了 await 等待异步操作，那它就是一个服务端渲染组件
-   在 dashboard 目录下建立一个 loading.tsx 组件，它会作为 Suspense 的 fallback 组件，在异步操作结束前作为占位 ui，推测 layout.tsx 的 children 会被一个 Suspense 包裹
-   如果 customers 也是服务端组件，它也会使用根目录下的 loading.tsx 组件作为界面 fallback，如果 customers 目录下也有 loading.tsx 文件则会使用自己目录下的 loading.tsx
-   如果希望在根目录添加 loading.tsx，又不希望它会影响到子目录(不想在子目录添加 loading.tsx)，可以将根目录的 page.tsx 和 loading.tsx 一起放到一个[(overview)]目录下，即[/dashboard/(overview)/page.tsx]和[/dashboard/(overview)/loading.tsx]

## 服务端渲染时参数怎么保存

服务端渲染时参数保存在 URL 中，所以涉及请求时，请求参数需要用更新 url 的方式

-   客户端使用`useRouter` 更改路由
-   服务端使用`Link`导航到新路由
-   Page 组件会接受一个`searchParams`的 props 参数，可以使用`const searchParams = await props.searchParams;`等待获取 url 参数

## 服务端渲染提交表单

服务端组件中的 form 元素的 action 接受一个函数，类似于 submit

```jsx
import { z } from "zod"; // Zod 是一个 TypeScript-first 的 schema 声明和验证库
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(["pending", "paid"]),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

async function createInvoice(formData: FormData) {
    'use server';
    const rawFormData = {
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    };
    const { customerId, amount, status } = CreateInvoice.parse(rawFormData);
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

    // Next.js 有一个客户端路由缓存，它会将路由片段暂时存储在用户的浏览器中。配合预取功能，该缓存可以确保用户能够快速地在路由之间切换，同时减少向服务器发出的请求次数。
    // 由于您正在更新发票路由中显示的数据，因此需要清除此缓存并触发新的服务器请求。您可以使用 Next.js 中的 `revalidatePath` 函数来实现这一点
    revalidatePath("/dashboard/invoices");

    redirect("/dashboard/invoices");
}
 <form action={createInvoice}></form>
```

### redirect

-   redirect() 主要用于服务端（Server Components、Server Actions、数据获取），会抛出异常
-   useRouter().replace() 仅用于客户端，是客户端导航 API
-   两者不是直接替代关系，根据使用场景选择合适的 API
-   需要替换历史记录时，客户端用 router.replace，服务端用 redirect（默认就是替换行为）

redirect 使用场景

1. 服务端数据获取后重定向 → 使用 redirect
2. 场景 2: 表单提交成功后重定向 → Server Action 中用 redirect

### Server Action

上面的`createInvoice`就是一个 Server Action

Server Action = 无需写 API 就能直接调用服务端代码，主要用于表单提交和数据修改操作，不适合纯数据获取。

Server Action 是 Next.js 中允许在客户端直接调用服务端代码的异步函数。通过 "use server" 指令标记，可以在不创建 API 路由的情况下执行服务端逻辑。

## error.tsx 文件

当界面执行代码发生错误时，显示错误 ui(error boundary)

```tsx
"use client"; // 必须是客户端组件

import { useEffect } from "react";

export default function Error({
    error, // js 抛出的错误
    reset, // 尝试重置渲染界面的函数
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    );
}
```

## not-found.tsx 文件

当确定界面不存在时(例如/uuid/edit 路由的 uuid 不存在于数据库时)，可以导航到 404 not found 界面，显示的就是 not-found.tsx 的 ui

需要记住的是，notFound 的优先级高于 error.tsx，因此当您想要处理更具体的错误时，可以调用它！

```tsx
import { notFound } from "next/navigation";

const id = (await props.params).id;
const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
]);
if (!invoice) {
    notFound();
}
```

## Accessibility - 无障碍访问

安装并配置 `eslint` `eslint-config-next`，实现无障碍相关属性没有设置时，报错提示

```js
// 在根目录创建 eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
    ...nextVitals,
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

### Form validation - 表单验证

使用 react 的 useActionState

```jsx
"use client";

import { CustomerField, InvoiceForm } from "@/app/lib/definitions";
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { State, updateInvoice } from "@/app/lib/actions";
import { useActionState } from "react";

export default function EditInvoiceForm({
    invoice,
    customers,
}: {
    invoice: InvoiceForm,
    customers: CustomerField[],
}) {
    const initialState: State = { errors: {}, message: null };
    const updateInvoiceById = updateInvoice.bind(null, invoice.id);
    const [state, formAction] = useActionState(updateInvoiceById, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <label
                        htmlFor="customer"
                        className="mb-2 block text-sm font-medium"
                    >
                        Choose customer
                    </label>
                    <div className="relative">
                        <select
                            id="customer"
                            name="customerId"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={invoice.customer_id}
                            aria-describedby="customer-error"
                        >
                            <option value="" disabled>
                                Select a customer
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                    <div
                        id="customer-error"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state.errors?.customerId &&
                            state.errors.customerId.map((error: string) => (
                                <p
                                    className="mt-2 text-sm text-red-500"
                                    key={error}
                                >
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/invoices"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Invoice</Button>
            </div>
        </form>
    );
}
```

server action

```ts
// 借助zod的方法进行表单值的验证和错误封装
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: "Please select a customer.",
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0." }),
    status: z.enum(["pending", "paid"], {
        invalid_type_error: "Please select an invoice status.",
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData
) {
    const rawFormData = {
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    };
    const validatedFields = CreateInvoice.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Data Error",
        };
    }
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    if (!id) {
        return {
            message: "id is not exist",
        };
    }

    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
          `;
    } catch (error) {
        console.error(error);
        return {
            message: "Database Error: Failed to Update Invoice",
        };
    }

    revalidatePath("/dashboard/invoices");

    redirect("/dashboard/invoices");
}
```

## authentication

这里使用`next-auth`帮助管理登录授权

1. 安装

```bash
pnpm i next-auth@beta
```

2. 新建 `auth.config.ts`

```ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login", // 当 authorized 返回 false、或 NextAuth 认为需要让用户登录时，会重定向到这个地址
    },
    callbacks: {
        /**
         * 说明：
         * - 命中 proxy.ts matcher 的请求，主要会触发 authorized（用于路由放行/拦截/重定向）。
         * - callbacks 里的其他方法不会对每个 matcher 请求都执行，
         *   而是在各自生命周期触发时运行：
         *   - signIn: 登录提交时
         *   - jwt: 创建/更新 token 时
         *   - session: 读取/返回 session 时
         *   - redirect: 发生重定向决策时
         */
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
```

3. 新建 proxy.ts

```ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

// 浏览器或客户端发起请求命中matcher中的路径时，会触发这个代理，Edge上会执行这段auth，其中会运行callbacks.authorized
export const config = {
    // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
```

4. 新建 auth.ts

```ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<
            User[]
        >`SELECT * FROM users WHERE email=${email}`;
        return user[0];
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}
// auth() = 在服务端读取当前请求对应的 session/user
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
});
```

**只要配置了 GIthub 的 provider 就能实现 github 的第三方登陆了吗？如果同时配置多个，它们会都支持？配置多个之后 signIn 的调用是否需要写一些兼容代码？**

基本是这样：

-   **只配 `GitHub` provider 不够“直接可用”**，还需要：

    -   GitHub OAuth App 的 `clientId/clientSecret`
    -   回调地址配置正确
    -   NextAuth 环境变量（如 `AUTH_SECRET`）就绪  
        配齐后就能用 GitHub 第三方登录。

-   **可以同时配置多个 provider**，会同时支持（例如 GitHub + Google + Credentials）。

-   **`signIn` 调用需要按 provider 区分**：
    -   第三方 OAuth：`signIn("github")`、`signIn("google")`
    -   Credentials：`signIn("credentials", formData)`（或传 email/password）

所以“兼容代码”不复杂，核心是：

-   UI 上给不同登录方式不同按钮
-   每个按钮调用对应 provider id
-   若有统一登录入口，就根据用户选择传不同 id 即可。

## metadata

在网页开发中，元数据提供有关网页的附加信息。元数据对访问网页的用户不可见。它隐藏在网页的 HTML 代码中，通常位于 `<head>` 元素内。这些隐藏信息对于搜索引擎和其他需要更好地理解网页内容的系统至关重要。

元数据在提升网页的搜索引擎优化 (SEO) 方面发挥着重要作用，它使网页更容易被搜索引擎和社交媒体平台访问和理解。正确的元数据有助于搜索引擎有效地索引网页，从而提高其在搜索结果中的排名。此外，像 Open Graph 这样的元数据还能改善社交媒体上分享链接的显示效果，使内容对用户更具吸引力和信息量。

### 元数据的类型

Title Metadata

```html
<title>Page Title</title>
```

Description Metadata

```html
<meta name="description" content="A brief description of the page content." />
```

Keyword Metadata

```html
<meta name="keywords" content="keyword1, keyword2, keyword3" />
```

Open Graph Metadata - 这些元数据增强了网页在社交媒体平台上分享时的呈现方式，提供了标题、描述和预览图像等信息。

```html
<meta property="og:title" content="Title Here" />
<meta property="og:description" content="Description Here" />
<meta property="og:image" content="image_url_here" />
```

Favicon Metadata

```html
<link rel="icon" href="path/to/favicon.ico" />
```

### 在 next.js 里增加 metadata

1. 在 layout.js 或 page.js 文件中导出静态元数据对象或动态 generateMetadata 函数。

```tsx
// layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | Acme Dashboard", // %s会自动替换成子界面中定义的title
        default: "Acme Dashboard", // 如果子界面没有定义title则显示 Acme Dashboard
    },
    description: "The official Next.js Learn Dashboard built with App Router.",
    metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

// /dashboard/invoices/page.tsx
export const metadata: Metadata = {
    title: "Invoices",
};
// /dashboard/invoices 的 title metadata 会显示为 Invoices | Acme Dashboard
```

2. 基于文件，特殊命名的文件会被 next.js 认为是 metadata 相关数据，会为它自动添加 metadata

`/app` 目录下的 `favicon.ico `和 `opengraph-image.png` 会自动变成 [Favicon Metadata] 和 [Open Graph Metadata]

## 'use cache'

**'use cache' 可以让数据库操作/fetch/甚至是 random()函数都进行缓存？什么时候会更新缓存？**

可以，但要分清“能缓存”与“该不该缓存”。

`'use cache'` 的作用是：**缓存这个函数（或组件）最终返回值**。  
所以从技术上说，函数里不管是数据库读取、`fetch`、还是 `Math.random()`，第一次算出来的结果都可能被缓存住并复用。

### 1) 哪些适合用 `'use cache'`

-   **适合**：数据库读、外部 API 读、昂贵计算（且希望短时间内结果稳定）
-   **不适合**：写操作（insert/update/delete）、依赖实时随机值/当前时间的逻辑、强用户态差异逻辑（除非你明确把差异作为 key）

> `random()` 放进 cached 函数后，常见结果就是“第一次随机值被复用”，看起来像“不随机了”。

---

### 2) 缓存什么时候更新

常见有这几种触发方式：

-   **时间到期**（TTL）：你配置了缓存生命周期后，到期会重算
-   **主动失效**：调用 `revalidateTag` / `revalidatePath`（通常在 mutation 后手动触发）
-   **缓存 key 变化**：函数参数变了（或参与 key 的上下文变了）会生成新缓存
-   **新部署**：通常会导致缓存重建（取决于平台与缓存层）

---

### 3) 和 `fetch` 缓存的关系

-   `fetch` 自己有缓存策略（`force-cache` / `no-store` / `revalidate`）
-   `'use cache'` 是**外层函数结果缓存**
-   即使内部 `fetch` 是 `no-store`，如果外层函数命中了 `'use cache'`，函数都不执行了，`fetch` 也不会再发起

---

实战建议：

-   读操作：`'use cache'` + tag/path 失效机制
-   写操作：不要 cache，写完后 `revalidateTag`/`revalidatePath` 刷新读缓存
