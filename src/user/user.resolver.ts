import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('username') username: string, @Args('email') email: string, @Args('password') password: string) {
    return this.userService.create(username, email, password);
  }

  // @Mutation(() => User)
  // async createUser(@Args('input') input: CreateUserInput): Promise<User> {
  //   return this.userService.createUser(input);
  // }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('username') username: string,
    @Args('email') email: string,
  ) {
    return this.userService.updateUser(id, username, email);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }
}
