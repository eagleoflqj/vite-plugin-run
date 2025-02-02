import type { ViteDevServer } from 'vite'

export interface ResolvedRunOptions {
	input: Runner[]
	silent: boolean
	skipDts: boolean
	env: Record<string, any>
}

export interface RunOptions {
	input?: Runner[] | Runner

	/**
	 * Hide output of commands
	 * @default true
	  */
	silent?: boolean

	/**
	 * Whether to skip hot updates when .d.ts files are changed.
	 * @default true
	 */
	skipDts?: boolean
}

export type Options = Runner[] | Runner | RunOptions
export type RunnerHandler = (parameters: RunnerHandlerParameters) => void

export interface RunnerHandlerParameters {
	file: string
	server: ViteDevServer
	type: 'add' | 'change' | 'unlink'
}

export interface Runner {
	/**
   * Name to identify the runner.
   */
	name: string

	/**
	 * Whether to run when starting the dev server or building for production.
	 * @default true
	 */
	startup?: boolean

	/**
	 * Condition for the handler to run when a file changes.
	 */
	condition?: (file: string) => boolean

	/**
	 * Executed when a watched file meets the condition.
	 */
	onFileChanged?: RunnerHandler

	/**
	 * Shell command executed when a wacthed file meets the condition.
	 */
	run?: string[] | (() => string[])

	/**
   * Delay before running the handler is executed (in ms)
   * @default 50 ms
   */
	delay?: number
}
