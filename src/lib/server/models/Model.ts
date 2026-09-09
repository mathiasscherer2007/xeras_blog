export interface Model<T> {
	/**
	 * @returns a primitive JS object of the instance
	 */
	getPrimitve(): T;
}