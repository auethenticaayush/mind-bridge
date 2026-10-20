import React from 'react';
import { Counselor, ScheduledSession, UserProfile } from '../types';

interface SessionsViewProps {
  sessions: ScheduledSession[];
  user: UserProfile;
  onJoinSession: (session: ScheduledSession) => void;
  onBookNew: () => void;
}

export const SessionsView: React.FC<SessionsViewProps> = ({
  sessions,
  user,
  onJoinSession,
  onBookNew,
}) => {
  const upcomingSessions = sessions.filter(s => s.status === 'upcoming' || s.status === 'live');
  const pastSessions = sessions.filter(s => s.status === 'completed');

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-6">
      {/* Top Banner: Campus Grant Balance */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-container to-primary text-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
          <div>
            <h3 className="font-bold text-[15px] leading-tight">Campus Health Credits</h3>
            <p className="text-[12px] text-on-primary-container">
              {user.universityDomain} Student Grant Active
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[20px] font-bold block leading-none">{user.grantCreditsRemaining}</span>
          <span className="text-[10px] uppercase font-semibold text-on-primary-container">
            Free Credits Left
          </span>
        </div>
      </div>

      {/* Upcoming / Active Sessions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[18px] text-on-surface">Scheduled Consultations</h2>
          <button
            onClick={onBookNew}
            className="text-[12px] text-primary font-semibold hover:underline flex items-center gap-0.5"
          >
            <span>+ Book New</span>
          </button>
        </div>

        {upcomingSessions.length > 0 ? (
          upcomingSessions.map(session => (
            <div
              key={session.id}
              className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container/60 flex flex-col gap-3 relative overflow-hidden"
            >
              {session.status === 'live' && (
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-ping"></span>
                  Ready to Join
                </div>
              )}

              <div className="flex items-start gap-3.5 pt-1">
                <img
                  alt={session.counselor.name}
                  className="w-14 h-14 rounded-2xl object-cover shadow-inner shrink-0"
                  src={session.counselor.avatarUrl || 'https://images.unsplash.com/photo-1594824813639-5095e09f7a5b?auto=format&fit=crop&w=400&q=80'}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[16px] text-on-surface truncate">
                    {session.counselor.title}
                  </h4>
                  <p className="text-[12px] text-primary font-medium">{session.counselor.specialty}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-on-surface-variant font-medium">
                    <span className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[13px] text-primary">calendar_month</span>
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[13px] text-secondary">schedule</span>
                      {session.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-surface-container/50">
                <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
                  <span className="material-symbols-outlined text-[15px] text-secondary">
                    {session.mode === 'video' ? 'videocam' : session.mode === 'voice' ? 'call' : 'chat'}
                  </span>
                  <span className="capitalize">{session.mode} Consultation</span>
                  <span>•</span>
                  <span>{session.durationMinutes} min</span>
                </div>

                <button
                  onClick={() => onJoinSession(session)}
                  className="px-4 py-2 rounded-full bg-primary text-white font-semibold text-[12px] shadow-sm hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">meeting_room</span>
                  <span>Enter Room</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 rounded-2xl bg-surface-container-low text-center">
            <span className="material-symbols-outlined text-outline text-[32px] mb-2">event_busy</span>
            <p className="text-[14px] text-on-surface font-semibold">No upcoming appointments</p>
            <p className="text-[12px] text-on-surface-variant mt-1">
              Use your free campus grant credit to book a confidential consultation.
            </p>
            <button
              onClick={onBookNew}
              className="mt-4 px-5 py-2.5 rounded-full bg-primary text-white text-[12px] font-semibold hover:bg-primary-container active:scale-95 transition-all"
            >
              Browse Counselors
            </button>
          </div>
        )}
      </section>

      {/* Past Completed Consultations */}
      <section className="space-y-3">
        <h2 className="font-bold text-[18px] text-on-surface">Past Consultations & Clinical Notes</h2>

        {pastSessions.map(session => (
          <div
            key={session.id}
            className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container/60 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-[15px] text-on-surface">{session.counselor.name}</h4>
                <p className="text-[11px] text-on-surface-variant">
                  {session.date} • {session.durationMinutes} Minutes ({session.mode})
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-semibold">
                Completed
              </span>
            </div>

            {session.notes && (
              <div className="p-3 bg-surface-container-low rounded-xl text-[12px] text-on-surface leading-relaxed">
                <span className="font-bold text-primary block mb-0.5 text-[11px] uppercase tracking-wider">
                  Private Session Takeaway:
                </span>
                {session.notes}
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-[11px] text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">sentiment_satisfied</span>
                Mood shifted from {session.moodBefore}/10 to {session.moodAfter}/10
              </span>
              <button
                onClick={onBookNew}
                className="text-primary font-semibold hover:underline"
              >
                Rebook
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
