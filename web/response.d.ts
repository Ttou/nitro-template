export {}

declare global {
  interface AjaxResponse<T> {
    /**
     * Returns the response's success status.
     */
    readonly success: boolean

    /**
     * Returns the response's status code.
     */
    readonly code: number

    /**
     * Returns the response's status message.
     */
    readonly message: string

    /**
     * Returns the response's data.
     */
    readonly data: T
  }
}
