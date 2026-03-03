use anchor_lang::prelude::*;

declare_id!("Agentx1111111111111111111111111111111111");

#[program]
pub mod agentx {
    use super::*;

    pub fn register_agent(ctx: Context<RegisterAgent>, name: String) -> Result<()> {
        let agent = &mut ctx.accounts.agent;
        agent.authority = *ctx.accounts.authority.key;
        agent.name = name;
        agent.bump = *ctx.bumps.get("agent").unwrap();
        Ok(())
    }

    pub fn submit_proof(ctx: Context<SubmitProof>, proof_hash: String) -> Result<()> {
        let agent = &mut ctx.accounts.agent;
        agent.last_proof = proof_hash;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct RegisterAgent<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 64 + 64 + 1,
        seeds = [b"agent", authority.key().as_ref()],
        bump
    )]
    pub agent: Account<'info, AgentAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SubmitProof<'info> {
    #[account(mut)]
    pub agent: Account<'info, AgentAccount>,
}

#[account]
pub struct AgentAccount {
    pub authority: Pubkey,
    pub name: String,
    pub last_proof: String,
    pub bump: u8,
}
