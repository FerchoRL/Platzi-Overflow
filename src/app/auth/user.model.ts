export class User{
	constructor(
		public email: string,
		public password: string,
		public firstName?: string,
		public lastName?: string
	)//Method implementation
	{}

	fullName(){
		return `${this.firstName} ${this.lastName}`
	}
}