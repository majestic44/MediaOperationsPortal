
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { PostsModule } from './posts/posts.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    ClientsModule,
    PostsModule,
    CampaignsModule,
    IntegrationsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
